import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getMyOrders();
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    return (
        <div className="home">
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <h3>Order #{order._id.slice(-6)}</h3>

                        <p>
                            Status: <strong>{order.status}</strong>
                        </p>

                        <p>
                            Total: ₹{order.totalAmount}
                        </p>

                        <h4>Items</h4>

                        {order.items.map((item, index) => (
                            <div key={index}>
                                <p>
                                    {item.product?.name || "Product"} —
                                    Quantity: {item.quantity} —
                                    ₹{item.price}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;