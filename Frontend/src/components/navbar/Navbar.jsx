import "./navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="container">
            <div className="item">
                <Link  className="link" to="/">Home</Link>
            </div>
            <div className="item">
                <Link className="link" to="/my-ratings">My Ratings</Link>
            </div>
            <div className="item">
                <Link className="link" to="/brew-history">Brew History</Link>
            </div>
            <div className="item">
                <Link className="link" to="/brew-updater">Brew Updater</Link>
            </div>
        </div>
    )
}

export default Navbar;