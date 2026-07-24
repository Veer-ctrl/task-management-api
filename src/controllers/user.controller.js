import * as userService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";export const 

getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers(req.user);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(
    req.params.id,
    req.user
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateRole = asyncHandler(async (req, res) => {
  const user = await userService.updateRole(
    req.params.id,
    req.body.role
  );

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: user,
  });
});

export const updateTeam =asyncHandler(async (req, res) => {
  const user = await userService.updateTeam(
    req.params.id,
    req.body.team
  );

  res.status(200).json({
    success: true,
    message: "Team updated successfully",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});