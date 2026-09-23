import API from "./api";

export const getProducts = (query = "") => {
    return API.get(
        query ? `/products?${query}` : "/products"
    );
};

export const getProductById = (id: string) => {
    return API.get(`/products/${id}`);
};