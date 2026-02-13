import React from "react";
import Container from "../../../components/shared/Container";
import { Link, NavLink } from "react-router";
import "./navbar.css";
import Logo from "../../../components/shared/Logo";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/all-products"
        >
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/about"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
      <li>
        <Link
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/login"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className="btn btn-outline hover:bg-primary hover:text-accent"
          to="/register"
        >
          Register
        </Link>
      </li>
    </>
  );
  return (
    <Container>
      <div className="navbar text-primary">
        <div className="navbar-start w-1/4">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 space-y-2 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo dark={true} />
        </div>
        <div className="navbar-end hidden w-3/4 lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
