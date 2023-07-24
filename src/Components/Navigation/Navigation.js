import "./Navigation.css";
import {Link, NavLink, Outlet} from "react-router-dom";
import React, {useContext} from "react";

function Navigation() {
    return (
        <div>
            <nav className="nav-bar">
                <div className="home-link">
                    <Link to="/">
                        Home
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/about">
                        About
                    </Link>


                    <Link to="/contact">
                        Contact
                    </Link>

                </div>
            </nav>

            <Outlet/>
        </div>
    );
}

export default Navigation;
