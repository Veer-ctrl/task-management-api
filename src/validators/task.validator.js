import { body } from "express-validator";
import { TASK_STATUS } from "../constants/taskStatus.js";
import { PRIORITIES } from "../constants/priorities.js";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date"),

  body("priority")
    .optional()
    .isIn(Object.values(PRIORITIES))
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(Object.values(TASK_STATUS))
    .withMessage("Invalid status"),

  body("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required")
    .isMongoId()
    .withMessage("Invalid user id"),
];

export const updateTaskValidator = [
  body("title").optional().trim(),

  body("description").optional().trim(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date"),

  body("priority")
    .optional()
    .isIn(Object.values(PRIORITIES))
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(Object.values(TASK_STATUS))
    .withMessage("Invalid status"),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid user id"),
];

export const assignTaskValidator = [
  body("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required")
    .isMongoId()
    .withMessage("Invalid user id"),
];