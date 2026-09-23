const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const adminOnly = require("../middleware/adminMiddleware");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);

router.get("/", protect, getMyOrders);

router.get("/all", protect, adminOnly, getAllOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;