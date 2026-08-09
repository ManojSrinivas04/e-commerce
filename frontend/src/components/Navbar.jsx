import { Link } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                E-Commerce
            </Link>

            <div className="nav-links">
                <Link to="/">Products</Link>

                {token && (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/orders">Orders</Link>
                    </>
                )}

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;