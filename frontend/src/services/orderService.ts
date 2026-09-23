import API from "./api";

export const createOrder = () => {
    return API.post("/orders");
};

export const getMyOrders = () => {
    return API.get("/orders");
};