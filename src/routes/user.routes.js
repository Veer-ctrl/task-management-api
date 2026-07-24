import express from "express";

import {
  getAllUsers,
  getUserById,
  updateRole,
  updateTeam,
  deleteUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  updateRoleValidator,
  updateTeamValidator,
} from "../validators/user.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getAllUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
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
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  protect,
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER),
  getUserById
);

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
router.patch(
  "/:id/role",
  protect,
  authorize(ROLES.ADMIN),
  updateRoleValidator,
  validate,
  updateRole
);

/**
 * @swagger
 * /users/{id}/team:
 *   patch:
 *     summary: Update user team
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: User team updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
router.patch(
  "/:id/team",
  protect,
  authorize(ROLES.ADMIN),
  updateTeamValidator,
  validate,
  updateTeam
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  protect,
  authorize(ROLES.ADMIN),
  deleteUser
);

export default router;