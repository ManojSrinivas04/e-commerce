const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product to Cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: req.user.id
        });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1
                    }
                ]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart
            });
        }

        // Check if product is already in cart
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get User Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                message: "Cart is empty",
                cart: {
                    items: []
                }
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update Cart Item Quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Remove Product from Cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemExists = cart.items.some(
            item => item.product.toString() === productId
        );

        if (!itemExists) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
};