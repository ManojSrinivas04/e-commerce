const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put("/:productId", protect, updateCartItem);

router.delete("/:productId", protect, removeFromCart);

module.exports = router;