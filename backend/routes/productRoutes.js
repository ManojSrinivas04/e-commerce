const validate = require("../middleware/validate");
const { productSchema } = require("../validators/productValidator");

const express = require("express");

const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Public routes
router.get("/", getProducts);

router.get("/:id", getProductById);

// Admin-only routes
router.post("/", protect, adminOnly, validate(productSchema), createProduct);
router.put("/:id", protect, adminOnly, validate(productSchema), updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;