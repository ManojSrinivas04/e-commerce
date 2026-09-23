import API from "./api";

export const createProduct = (product: {
    name: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}) => {
    return API.post("/products", product);
};

export const updateProduct = (
    id: string,
    product: {
        name: string;
        price: number;
        category: string;
        image: string;
        stock: number;
    }
) => {
    return API.put(`/products/${id}`, product);
};

export const deleteProduct = (id: string) => {
    return API.delete(`/products/${id}`);
};