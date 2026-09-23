import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [isAdmin, setIsAdmin] = useState(
        JSON.parse(
            localStorage.getItem("user") || "null"
        )?.role === "admin"
    );

    useEffect(() => {
        const handleAuthChange = () => {
            const token = localStorage.getItem("token");

            const user = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            setIsLoggedIn(!!token);
            setIsAdmin(user?.role === "admin");
        };

        window.addEventListener(
            "authChange",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleAuthChange
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setIsAdmin(false);

        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="logo"
            >
                E-Commerce
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Products
                </Link>

                {isLoggedIn && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/orders">
                            Orders
                        </Link>

                        {isAdmin && (
                            <Link to="/admin">
                                Admin
                            </Link>
                        )}
                    </>
                )}

                {!isLoggedIn ? (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}

            </div>
        </nav>
    );
}

export default Navbar;