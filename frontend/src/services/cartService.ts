import API from "./api";

export const getCart = () => {
    return API.get("/cart");
};

export const addToCart = (productId: string, quantity: number = 1) => {
    return API.post("/cart", {
        productId,
        quantity
    });
};

export const updateCartItem = (productId: string, quantity: number) => {
    return API.put(`/cart/${productId}`, {
        quantity
    });
};

export const removeFromCart = (productId: string) => {
    return API.delete(`/cart/${productId}`);
};