const validate = require("../middleware/validate");
const {
    registerSchema,
    loginSchema
} = require("../validators/authValidator");


const express = require("express");



const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
});

module.exports = router;