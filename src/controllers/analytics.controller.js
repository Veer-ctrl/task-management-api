import asyncHandler from "../utils/asyncHandler.js";
import * as analyticsService from "../services/analytics.service.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getAnalytics(req.user);

  res.status(200).json({
    success: true,
    data: analytics,
  });
});