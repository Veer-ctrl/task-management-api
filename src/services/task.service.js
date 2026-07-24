import Task from "../models/Task.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import ApiError from "../utils/ApiError.js";

const checkPermission = async (user, assignedUserId = null) => {
  // Admin can do everything
  if (user.role === ROLES.ADMIN) return;

  // Manager can manage only users in their own team
  if (user.role === ROLES.MANAGER) {
    if (!assignedUserId) return;

    const assignedUser = await User.findById(assignedUserId);

    if (!assignedUser) {
      throw new ApiError(404, "Assigned user not found");
    }

    if (assignedUser.team?.toString() !== user.team?.toString()) {
      throw new ApiError(403, "You can only manage users in your own team");
    }

    return;
  }

  // Users can only create/manage tasks assigned to themselves
  if (
    user.role === ROLES.USER &&
    assignedUserId &&
    assignedUserId.toString() !== user._id.toString()
  ) {
    throw new ApiError(403, "You can only create tasks for yourself");
  }
};

export const createTask = async (taskData, currentUser) => {
  await checkPermission(currentUser, taskData.assignedTo);

  taskData.createdBy = currentUser._id;

  return await Task.create(taskData);
};

export const getAllTasks = async (currentUser, filters = {}) => {
  const query = {};

  // ===== Role Based Access =====

  if (currentUser.role === ROLES.USER) {
    query.assignedTo = currentUser._id;
  }

  if (currentUser.role === ROLES.MANAGER) {
    const teamUsers = await User.find({
      team: currentUser.team,
    }).select("_id");

    query.assignedTo = {
      $in: teamUsers.map((user) => user._id),
    };
  }

  // ===== Filters =====

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  // ===== Search =====

  if (filters.search) {
    query.$or = [
      {
        title: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  // ===== Pagination =====

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    tasks,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getTaskById = async (taskId, currentUser) => {
  const task = await Task.findById(taskId)
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (
    currentUser.role === ROLES.USER &&
    task.assignedTo._id.toString() !== currentUser._id.toString()
  ) {
    throw new ApiError(403, "Unauthorized");
  }

  if (
    currentUser.role === ROLES.MANAGER &&
    task.assignedTo.team &&
    task.assignedTo.team?.toString() !== currentUser.team?.toString()
  ) {
    throw new ApiError(403, "Unauthorized");
  }

  return task;
};

export const updateTask = async (taskId, updateData, currentUser) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await checkPermission(currentUser, task.assignedTo);

  Object.assign(task, updateData);

  return await task.save();
};

export const deleteTask = async (taskId, currentUser) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await checkPermission(currentUser, task.assignedTo);

  await task.deleteOne();

  return;
};

export const assignTask = async (taskId, assignedUserId, currentUser) => {
  await checkPermission(currentUser, assignedUserId);

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.assignedTo = assignedUserId;

  return await task.save();
};
