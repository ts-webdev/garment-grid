import React, { useEffect, useState } from "react";
import Container from "../../../components/shared/Container";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../components/shared/Logo";
import {
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // ===== scroll effect =====
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== close mobile on route change =====
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // ===== logout =====
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // ===== links =====
  const baseLinks = [
    { path: "/", label: "Home", icon: <FaHome className="text-sm" /> },
    {
      path: "/all-products",
      label: "All Products",
      icon: <FaBoxOpen className="text-sm" />,
    },
  ];

  const publicLinks = [
    {
      path: "/about",
      label: "About Us",
      icon: <FaInfoCircle className="text-sm" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="text-sm" />,
    },
  ];

  const authLinks = [
    {
      path: "/login",
      label: "Login",
      icon: <FaUser className="text-sm" />,
      primary: false,
    },
    {
      path: "/register",
      label: "Register",
      icon: <FaUserPlus className="text-sm" />,
      primary: true,
    },
  ];

  // ===== classes =====
  const desktopLinkClass = ({ isActive }) => `
    relative px-4 py-2 font-medium rounded-lg transition-all duration-300
    ${
      isActive
        ? "text-[#703B3B] bg-[#703B3B]/10"
        : "text-gray-700 hover:text-[#4d3d30] hover:bg-[#e8e0d4]/50"
    }
    ${isScrolled ? "text-sm" : "text-base"}
  `;

  const mobileLinkClass = ({ isActive }) => `
    block px-4 py-3 text-base font-medium transition-all duration-300
    ${
      isActive
        ? "text-[#703B3B] bg-[#703B3B]/10 border-l-4 border-[#703B3B]"
        : "text-gray-600 hover:text-[#4d3d30] hover:bg-[#e8e0d4]/30 border-l-4 border-transparent"
    }
  `;

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/90 shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        {/* ===== Top Row ===== */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo dark={true} />

          {/* ===== Desktop Right Side (ALWAYS RIGHT) ===== */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {[...baseLinks, ...(user ? [] : publicLinks)].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={desktopLinkClass}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </NavLink>
            ))}

            {/* Dashboard after login */}
            {user && (
              <NavLink to="/dashboard" className={desktopLinkClass}>
                <span className="flex items-center gap-2">
                  <FaTachometerAlt className="text-sm" />
                  Dashboard
                </span>
              </NavLink>
            )}

            {/* Auth area */}
            {!user ? (
              authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`ml-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    link.primary
                      ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white hover:shadow-lg hover:scale-105"
                      : "border border-[#e8e0d4] text-gray-700 hover:border-[#703B3B] hover:text-[#703B3B] hover:bg-[#e8e0d4]/30"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))
            ) : (
              <div className="dropdown dropdown-end ml-2">
                <label tabIndex={0} className="cursor-pointer">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full border-2 border-[#703B3B]/30"
                  />
                </label>

                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard">
                      <FaUserCircle /> Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* ===== Mobile Button ===== */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-[#e8e0d4]/30 flex items-center justify-center ml-auto"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-[#e8e0d4] p-4">
                <div className="space-y-1">
                  {[...baseLinks, ...(user ? [] : publicLinks)].map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={mobileLinkClass}
                    >
                      <span className="flex items-center gap-3">
                        {link.icon}
                        {link.label}
                      </span>
                    </NavLink>
                  ))}

                  {user && (
                    <NavLink to="/dashboard" className={mobileLinkClass}>
                      <span className="flex items-center gap-3">
                        <FaTachometerAlt />
                        Dashboard
                      </span>
                    </NavLink>
                  )}
                </div>

                {/* Mobile Auth */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#e8e0d4]">
                  {!user ? (
                    authLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`py-3 rounded-lg text-sm font-medium text-center flex items-center justify-center gap-2 ${
                          link.primary
                            ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white"
                            : "border border-[#e8e0d4] text-gray-700"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="col-span-2 py-3 rounded-lg bg-[#703B3B] text-white flex items-center justify-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
