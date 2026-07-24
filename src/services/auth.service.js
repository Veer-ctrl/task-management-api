import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  user.password = undefined;

  return {
    user,
    token,
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};