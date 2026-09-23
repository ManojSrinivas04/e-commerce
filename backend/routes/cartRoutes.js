const validate = require("../middleware/validate");
const {
    addToCartSchema,
    updateCartSchema
} = require("../validators/cartValidator");

const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, validate(addToCartSchema), addToCart);

router.get("/", protect, getCart);

router.put("/:productId", protect, validate(updateCartSchema), updateCartItem);

router.delete("/:productId", protect, removeFromCart);

module.exports = router;