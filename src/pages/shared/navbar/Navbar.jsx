import React from "react";
import Container from "../../../components/shared/Container";
import logo from "../../../assets/garment-grid.svg"
import { Link, NavLink } from "react-router";
import "./navbar.css";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink className="btn btn-outline hover:bg-primary hover:text-accent" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className="btn btn-outline hover:bg-primary hover:text-accent" to="/all-products">All Products</NavLink>
      </li>
      <li>
        <Link className="btn btn-secondary hover:bg-primary hover:text-accent" to="/login">Login</Link>
      </li>
    </>
  );
  return (
    <Container>
      <div className="navbar text-primary">
        <div className="navbar-start ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="flex items-center gap-1 text-4xl racing-sans font-black">
            <img className="w-10" src={logo} alt="" />
            GarmentGrid</a>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 gap-2">
            {links}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
