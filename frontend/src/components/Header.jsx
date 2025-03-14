import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Student Management System
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
