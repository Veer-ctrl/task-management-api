import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import ApiError from "../utils/ApiError.js";

export const getAllUsers = async (currentUser) => {
  if (currentUser.role === ROLES.ADMIN) {
    return await User.find().select("-password");
  }

  if (currentUser.role === ROLES.MANAGER) {
    return await User.find({
      team: currentUser.team,
    }).select("-password");
  }

  throw new ApiError(403, "Unauthorized");
};

export const getUserById = async (id, currentUser) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (currentUser.role === ROLES.ADMIN) {
    return user;
  }

  if (
    currentUser.role === ROLES.MANAGER &&
    user.team?.toString() === currentUser.team?.toString()
  ) {
    return user;
  }

  if (currentUser._id.toString() === id) {
    return user;
  }

  throw new ApiError(403, "Unauthorized");
};

export const updateRole = async (id, role) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = role;

  return await user.save();
};

export const updateTeam = async (id, team) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.team = team;

  return await user.save();
};

export const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.deleteOne();
};