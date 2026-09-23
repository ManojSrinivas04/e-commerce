const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().trim().min(2).max(50).required(),
    image: Joi.string().uri().required(),
    stock: Joi.number().integer().min(0).required()
});

module.exports = {
    productSchema
};