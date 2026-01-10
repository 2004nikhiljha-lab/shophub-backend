// routes/adminRoutes.js
const express = require("express");
const {
  getAllOrders,
  getAllUsers,
  getDashboardStats,
  updateOrderStatus,
  deleteUser
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// All routes require authentication AND admin privileges
router.get("/stats", protect, admin, getDashboardStats);
router.get("/orders", protect, admin, getAllOrders);
router.get("/users", protect, admin, getAllUsers);
router.put("/orders/:id", protect, admin, updateOrderStatus);
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;