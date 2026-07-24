import Task from "../models/Task.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

export const getAnalytics = async (currentUser) => {
  let query = {};

  // Admin → All tasks
  if (currentUser.role === ROLES.ADMIN) {
    query = {};
  }

  // Manager → Team tasks
  else if (currentUser.role === ROLES.MANAGER) {
    const teamUsers = await User.find({
      team: currentUser.team,
    }).select("_id");

    query.assignedTo = {
      $in: teamUsers.map((user) => user._id),
    };
  }

  // User → Own tasks
  else {
    query.assignedTo = currentUser._id;
  }

  const total = await Task.countDocuments(query);

  const completed = await Task.countDocuments({
    ...query,
    status: TASK_STATUS.COMPLETED,
  });

  const pending = await Task.countDocuments({
    ...query,
    status: TASK_STATUS.TODO,
  });

  const overdue = await Task.countDocuments({
    ...query,
    dueDate: { $lt: new Date() },
    status: { $ne: TASK_STATUS.COMPLETED },
  });

  return {
    total,
    completed,
    pending,
    overdue,
  };
};
