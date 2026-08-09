import API from "./api";

export const getCart = () => {
    return API.get("/cart");
};

export const addToCart = (productId, quantity = 1) => {
    return API.post("/cart", {
        productId,
        quantity
    });
};

export const updateCartItem = (productId, quantity) => {
    return API.put(`/cart/${productId}`, {
        quantity
    });
};

export const removeFromCart = (productId) => {
    return API.delete(`/cart/${productId}`);
};