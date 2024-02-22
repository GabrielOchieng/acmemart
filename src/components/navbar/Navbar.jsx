import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State variable for tracking menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg mb-5 fixed-top bg-light mb-2">
      <div className="container-fluid d-flex  justify-content-between align-items-center">
        <button
          className="navbar-toggler mb-2"
          type="button"
          onClick={toggleMenu} // Toggle menu on click
          data-bs-toggle={isOpen ? "collapse" : ""} // Conditional collapse data-bs-toggle
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen} // Update aria-expanded based on isOpen
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <Link to="/" className="navbar-brand font-bolder">
            WILLY COLLECTIONS
          </Link>
        </div>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} // Conditional collapse class
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/wishlist"
                className="nav-link active"
                aria-current="page"
              >
                SHOP ALL
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link">
                WOMEN'S WEAR
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link">
                MEN'S WEAR
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link">
                HOUSEHOLDS
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <form
            role="search"
            className="position-relative mb-2 collapse navbar-collapse show" // Always show search form
          >
            <IoSearch className="position-absolute top-30  searchicon cursor-pointer" />
            <input
              className="form-control bg-body-tertiary me-2 rounded-pill ps-4 pe-5 "
              type="search"
              placeholder="Search for products..."
              aria-label="Search"
            />
          </form>
        </div>
        <div className="d-flex gap-3 align-items-center ms-4">
          <Link to="/product/:id" className="nav-link">
            <FiShoppingCart />
          </Link>
          <Link to="/login" className="nav-link">
            <IoPersonCircleOutline />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
