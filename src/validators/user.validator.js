import { body } from "express-validator";
import { ROLES } from "../constants/roles.js";

export const updateRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(ROLES))
    .withMessage("Invalid role"),
];

export const updateTeamValidator = [
  body("team")
    .trim()
    .notEmpty()
    .withMessage("Team is required"),
];