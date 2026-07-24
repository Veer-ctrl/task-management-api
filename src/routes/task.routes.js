import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
} from "../controllers/task.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createTaskValidator,
  updateTaskValidator,
  assignTaskValidator,
} from "../validators/task.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task Management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskRequest'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  createTaskValidator,
  validate,
  createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  getAllTasks
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  getTaskById
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskRequest'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
router.put(
  "/:id",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  updateTaskValidator,
  validate,
  updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete(
  "/:id",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  deleteTask
);

/**
 * @swagger
 * /tasks/{id}/assign:
 *   patch:
 *     summary: Assign task to a user
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignTaskRequest'
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
router.patch(
  "/:id/assign",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  assignTaskValidator,
  validate,
  assignTask
);

export default router;