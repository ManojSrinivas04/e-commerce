import API from "./api";

export const getProducts = () => {
    return API.get("/products");
};

export const getProductById = (id) => {
    return API.get(`/products/${id}`);
};