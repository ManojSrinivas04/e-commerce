import { useEffect, useState } from "react";
import {
    getCart,
    updateCartItem,
    removeFromCart
} from "../services/cartService";

import { createOrder } from "../services/orderService";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchCart = async () => {
        try {
            const response = await getCart();

            setCart(response.data.cart || response.data);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load cart"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdate = async (productId, quantity) => {
        if (quantity < 1) {
            return;
        }

        try {
            await updateCartItem(productId, quantity);
            await fetchCart();
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to update cart"
            );
        }
    };

    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);
            await fetchCart();
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to remove product"
            );
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await createOrder();

            setMessage(response.data.message);

            await fetchCart();
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to place order"
            );
        }
    };

    if (loading) {
        return <h2>Loading cart...</h2>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="home">
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>

                {message && <p>{message}</p>}
            </div>
        );
    }

    return (
        <div className="home">
            <h1>Your Cart</h1>

            {message && <p>{message}</p>}

            {cart.items.map((item) => (
                <div
                    className="cart-item"
                    key={item.product._id}
                >
                    <h3>{item.product.name}</h3>

                    <p>
                        Price: ₹{item.product.price}
                    </p>

                    <p>
                        Quantity: {item.quantity}
                    </p>

                    <button
                        onClick={() =>
                            handleUpdate(
                                item.product._id,
                                item.quantity - 1
                            )
                        }
                        disabled={item.quantity === 1}
                    >
                        -
                    </button>

                    <button
                        onClick={() =>
                            handleUpdate(
                                item.product._id,
                                item.quantity + 1
                            )
                        }
                    >
                        +
                    </button>

                    <button
                        onClick={() =>
                            handleRemove(item.product._id)
                        }
                    >
                        Remove
                    </button>

                    <hr />
                </div>
            ))}

            <button onClick={handleCheckout}>
                Place Order
            </button>
        </div>
    );
}

export default Cart;