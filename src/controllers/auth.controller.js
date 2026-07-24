import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await registerUser(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});


export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginUser(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
  });
});


export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});


export const getMe =asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});