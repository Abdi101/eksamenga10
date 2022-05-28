import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const isAdmin = localStorage.getItem('isAdmin');
const userToken = localStorage.getItem('userToken');

function Header() {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const location = useLocation().pathname.split("/")[1] || "Dashboard"


    return (
        <header style={{ position: "relative" }}>
            <h3>
                <Link to="/" className="logo">{location}</Link>
            </h3>

            <nav className="nav-bar">
                <ul>
                    {
                        userToken ? (
                            <>
                                <li onClick={handleLogout}>
                                    <Link to="/">Logout</Link>
                                </li>

                                {/* <li>
                                    <Link to="/brew-updater">Brew Updater</Link>
                                </li> */}
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )

                    }

                </ul>
            </nav>

            {isAdmin === "true" && <div style={{
                position: "absolute",
                right: "30px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginRight: "20px"
            }}>
                <Link to="/users"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <button className="button-admin">Add Users</button>
                </Link>
                <Link to="/"
                    style={{
                        borderBottom: "1px solid transparent",
                    }}
                >
                    <button className="button-admin">Manage Beans</button>
                </Link>
            </div>}

        </header>
    )
}

export default Header;