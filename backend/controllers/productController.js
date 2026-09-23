const Product = require("../models/Product");
const { redisClient } = require("../config/redis");

const invalidateProductCache = async () => {
    try {
        for await (const key of redisClient.scanIterator({
            MATCH: "products:*",
            COUNT: 100
        })) {
            await redisClient.del(key);
        }
    } catch (error) {
        console.error("Redis cache invalidation failed:", error);
    }
};

// Create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        await invalidateProductCache();

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Products
const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const cacheKey = `products:${JSON.stringify({
            search: search || "",
            category: category || "",
            minPrice: minPrice || "",
            maxPrice: maxPrice || "",
            sort: sort || "",
            page: Number(page),
            limit: Number(limit)
        })}`;

        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
            console.log("Redis Cache HIT");

            return res.status(200).json(
                JSON.parse(cachedProducts)
            );
        }

        console.log("Redis Cache MISS");

        const filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        let query = Product.find(filter);

        if (sort === "price") {
            query = query.sort({ price: 1 });
        }

        if (sort === "-price") {
            query = query.sort({ price: -1 });
        }

        const skip =
            (Number(page) - 1) * Number(limit);

        const products = await query
            .skip(skip)
            .limit(Number(limit));

        const totalProducts =
            await Product.countDocuments(filter);

        const responseData = {
            products,
            currentPage: Number(page),
            totalPages: Math.ceil(
                totalProducts / Number(limit)
            ),
            totalProducts
        };

        await redisClient.set(
            cacheKey,
            JSON.stringify(responseData),
            {
                EX: 60
            }
        );

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await invalidateProductCache();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await invalidateProductCache();

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};