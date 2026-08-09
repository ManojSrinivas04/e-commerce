import { addToCart } from "../services/cartService";

function ProductCard({ product }) {

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }

        try {
            await addToCart(product._id, 1);
            alert("Product added to cart!");
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Unable to add product to cart"
            );
        }
    };

    return (
        <div className="product-card">

            <div className="product-image">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                ) : (
                    <div className="no-image">
                        No Image
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>

                <p className="product-price">
                    ₹{product.price}
                </p>

                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>

        </div>
    );
}

export default ProductCard;