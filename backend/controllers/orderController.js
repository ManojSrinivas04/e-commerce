const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Place Order
const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        const orderItems = cart.items.map(item => {
            const price = item.product.price;

            totalAmount += price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: price
            };
        });

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount
        });

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get My Orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).populate("items.product");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders
};