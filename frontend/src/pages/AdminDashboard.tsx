import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";

import {
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/adminProductService";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}

interface ProductForm {
    name: string;
    price: string;
    category: string;
    image: string;
    stock: string;
}

const emptyForm: ProductForm = {
    name: "",
    price: "",
    category: "",
    image: "",
    stock: ""
};

function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState<ProductForm>(emptyForm);

    const [editingId, setEditingId] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const isAdmin = user?.role === "admin";

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await getProducts();

            setProducts(response.data.products);

        } catch (error: any) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load products"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setMessage("");

        const productData = {
            name: form.name.trim(),
            price: Number(form.price),
            category: form.category.trim(),
            image: form.image.trim(),
            stock: Number(form.stock)
        };

        try {
            if (editingId) {
                const response = await updateProduct(
                    editingId,
                    productData
                );

                setMessage(
                    response.data.message ||
                    "Product updated successfully"
                );
            } else {
                const response = await createProduct(
                    productData
                );

                setMessage(
                    response.data.message ||
                    "Product created successfully"
                );
            }

            resetForm();

            await fetchProducts();

        } catch (error: any) {
            console.error(error);

            const validationErrors =
                error.response?.data?.errors;

            if (validationErrors) {
                setMessage(validationErrors.join(", "));
            } else {
                setMessage(
                    error.response?.data?.message ||
                    "Operation failed"
                );
            }
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product._id);

        setForm({
            name: product.name,
            price: String(product.price),
            category: product.category,
            image: product.image,
            stock: String(product.stock)
        });

        setMessage("");
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await deleteProduct(id);

            setMessage(
                response.data.message ||
                "Product deleted successfully"
            );

            await fetchProducts();

        } catch (error: any) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to delete product"
            );
        }
    };

    if (!isAdmin) {
        return (
            <div className="home">
                <h1>Access Denied</h1>

                <p>
                    You must be an administrator to access
                    this page.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="home">
                <h2>Loading admin dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="home">
            <h1>Admin Dashboard</h1>

            {message && (
                <p>
                    {message}
                </p>
            )}

            <h2>
                {editingId
                    ? "Edit Product"
                    : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                />

                <br />
                <br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={50}
                />

                <br />
                <br />

                <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    step="1"
                />

                <br />
                <br />

                <button type="submit">
                    {editingId
                        ? "Update Product"
                        : "Add Product"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                )}

            </form>

            <hr />

            <h2>Manage Products</h2>

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <div
                        key={product._id}
                        className="product-card"
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        <h3>{product.name}</h3>

                        <p>
                            Price: ₹{product.price}
                        </p>

                        <p>
                            Category: {product.category}
                        </p>

                        <p>
                            Stock: {product.stock}
                        </p>

                        <button
                            onClick={() =>
                                handleEdit(product)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                handleDelete(product._id)
                            }
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminDashboard;