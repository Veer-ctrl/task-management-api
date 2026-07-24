import * as taskService from "../services/task.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const { page, limit, status, priority, search } = req.query;

  const result = await taskService.getAllTasks(req.user, {
    page,
    limit,
    status,
    priority,
    search,
  });

  res.status(200).json({
    success: true,
    page: result.page,
    pages: result.pages,
    total: result.total,
    count: result.tasks.length,
    data: result.tasks,
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.body,
    req.user
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

export const assignTask = asyncHandler(async (req, res) => {
  const task = await taskService.assignTask(
    req.params.id,
    req.body.assignedTo,
    req.user
  );

  res.status(200).json({
    success: true,
    message: "Task assigned successfully",
    data: task,
  });
});