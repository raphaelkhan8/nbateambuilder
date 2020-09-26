import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <Link to="/point_guards" style={{ marginRight: 20 }}>
                Point Guards
            </Link>
            <Link to="/shooting_guards" style={{ marginRight: 20 }}>
                Shooting Guards
            </Link>
            <Link to="/small_forwards" style={{ marginRight: 20 }}>
                Small Forwards
            </Link>
            <Link to="/power_forwards" style={{ marginRight: 20 }}>
                Power Forwards
            </Link>
            <Link to="/centers" style={{ marginRight: 20 }}>
                Centers
            </Link>
        </div>
    );
};

export default Nav;
