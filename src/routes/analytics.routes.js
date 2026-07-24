import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics APIs
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get task analytics
 *     tags: [Analytics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */
router.get("/", protect, getAnalytics);

export default router;