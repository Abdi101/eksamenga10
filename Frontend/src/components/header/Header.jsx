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


    return (
        <header style={{ position: "relative" }}>
            <h3>
                <Link to="/" className="logo">CoffeDash</Link>
            </h3>
            <div className="rightAlign">
            <nav className="nav-bar">
                <ul>
                    {isAdmin === "true" && <>
                        <li><Link to="/users">Users</Link></li>  
                    </>}

                    {
                        userToken ? (
                            <>
                                <li><Link to="/coffee-beans">Coffee beans</Link></li>
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
            </div>
        </header>
    )
}

export default Header;