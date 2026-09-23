import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "../App.css";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}

interface ProductsResponse {
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
}

function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    // Input values
    const [searchInput, setSearchInput] = useState("");
    const [minPriceInput, setMinPriceInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");

    // Applied filter values
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 10;

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (search.trim()) {
                params.append("search", search.trim());
            }

            if (category) {
                params.append("category", category);
            }

            if (minPrice) {
                params.append("minPrice", minPrice);
            }

            if (maxPrice) {
                params.append("maxPrice", maxPrice);
            }

            if (sort) {
                params.append("sort", sort);
            }

            params.append("page", String(currentPage));
            params.append("limit", String(limit));

            const response = await getProducts(params.toString());

            const data: ProductsResponse = response.data;

            setProducts(data.products);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.error(error);
            setError("Unable to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, minPrice, maxPrice, category, sort, currentPage]);

    // Apply search and price filters
    const handleApplyFilters = () => {
        setCurrentPage(1);

        setSearch(searchInput);
        setMinPrice(minPriceInput);
        setMaxPrice(maxPriceInput);
    };

    // Enter key for search
    const handleSearchKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleApplyFilters();
        }
    };

    const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="home">

            <h1>E-Commerce Platform</h1>

            <h2>Products</h2>

            <div className="product-filters">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) =>
                        setSearchInput(e.target.value)
                    }
                    onKeyDown={handleSearchKeyDown}
                />

                {/* Category */}
                <select
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">
                        All Categories
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Clothing">
                        Clothing
                    </option>

                    <option value="Books">
                        Books
                    </option>
                </select>

                {/* Minimum Price */}
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPriceInput}
                    onChange={(e) =>
                        setMinPriceInput(e.target.value)
                    }
                    min="0"
                />

                {/* Maximum Price */}
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPriceInput}
                    onChange={(e) =>
                        setMaxPriceInput(e.target.value)
                    }
                    min="0"
                />

                {/* Sort */}
                <select
                    value={sort}
                    onChange={handleSortChange}
                >
                    <option value="">
                        Sort by
                    </option>

                    <option value="price">
                        Price: Low to High
                    </option>

                    <option value="-price">
                        Price: High to Low
                    </option>
                </select>

                {/* Apply */}
                <button onClick={handleApplyFilters}>
                    Apply Filters
                </button>

            </div>

            {/* Products */}
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <>
                    <div className="product-grid">

                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>

                    {/* Pagination */}
                    <div className="pagination">

                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
                            disabled={
                                currentPage === totalPages
                            }
                        >
                            Next
                        </button>

                    </div>
                </>
            )}

        </div>
    );
}

export default Home;