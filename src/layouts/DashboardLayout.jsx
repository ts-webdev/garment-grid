import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/shared/Container";
import Logo from "../components/shared/Logo";
import useAuth from "../hooks/useAuth";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaUserPlus,
  FaUserCog,
  FaShoppingCart,
  FaCreditCard,
  FaStar,
  FaEnvelope,
  FaHeadset,
  FaQuestionCircle,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { GiSewingMachine, GiCutDiamond, GiRolledCloth } from "react-icons/gi";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order received", time: "5 min ago", read: false },
    { id: 2, text: "Payment confirmed", time: "1 hour ago", read: false },
    { id: 3, text: "Order shipped", time: "2 hours ago", read: true },
  ]);

  // Mock user role - replace with actual role from auth
  const userRole = user?.role || "buyer"; // "admin", "manager", "buyer"

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Sidebar menu items based on role
  const menuItems = {
    admin: [
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", exact: true },
      {
        path: "/dashboard/manage-users",
        icon: <FaUsers />,
        label: "Manage Users",
      },
      {
        path: "/dashboard/all-products",
        icon: <FaBoxOpen />,
        label: "All Products",
      },
      {
        path: "/dashboard/all-orders",
        icon: <FaShoppingBag />,
        label: "All Orders",
      },
      {
        path: "/dashboard/analytics",
        icon: <FaChartLine />,
        label: "Analytics",
      },
    ],
    manager: [
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", exact: true },
      {
        path: "/dashboard/add-product",
        icon: <FaBoxOpen />,
        label: "Add Product",
      },
      {
        path: "/dashboard/manage-products",
        icon: <FaShoppingBag />,
        label: "Manage Products",
      },
      {
        path: "/dashboard/pending-orders",
        icon: <FaClock />,
        label: "Pending Orders",
      },
      {
        path: "/dashboard/approved-orders",
        icon: <FaCheckCircle />,
        label: "Approved Orders",
      },
      {
        path: "/dashboard/profile",
        icon: <FaUserCircle />,
        label: "My Profile",
      },
    ],
    buyer: [
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", exact: true },
      {
        path: "/dashboard/my-orders",
        icon: <FaShoppingBag />,
        label: "My Orders",
      },
      {
        path: "/dashboard/track-order",
        icon: <FaTruck />,
        label: "Track Order",
      },
      { path: "/dashboard/wishlist", icon: <FaStar />, label: "Wishlist" },
      {
        path: "/dashboard/profile",
        icon: <FaUserCircle />,
        label: "My Profile",
      },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.buyer;

  // Quick stats based on role
  const stats = {
    admin: [
      {
        label: "Total Users",
        value: "1,245",
        change: "+12%",
        icon: <FaUsers />,
      },
      {
        label: "Total Products",
        value: "456",
        change: "+5%",
        icon: <FaBoxOpen />,
      },
      {
        label: "Total Orders",
        value: "3,892",
        change: "+18%",
        icon: <FaShoppingBag />,
      },
      {
        label: "Revenue",
        value: "$124K",
        change: "+23%",
        icon: <FaCreditCard />,
      },
    ],
    manager: [
      { label: "My Products", value: "24", change: "+3", icon: <FaBoxOpen /> },
      { label: "Pending Orders", value: "8", change: "-2", icon: <FaClock /> },
      {
        label: "Completed",
        value: "156",
        change: "+12",
        icon: <FaCheckCircle />,
      },
      {
        label: "Revenue",
        value: "$45K",
        change: "+8%",
        icon: <FaCreditCard />,
      },
    ],
    buyer: [
      {
        label: "My Orders",
        value: "12",
        change: "+2",
        icon: <FaShoppingBag />,
      },
      {
        label: "In Progress",
        value: "3",
        change: "0",
        icon: <GiSewingMachine />,
      },
      { label: "Delivered", value: "9", change: "+2", icon: <FaTruck /> },
      { label: "Saved Items", value: "5", change: "+1", icon: <FaStar /> },
    ],
  };

  const currentStats = stats[userRole] || stats.buyer;

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? "dark" : ""}`}
    >
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${isSidebarOpen ? "w-72" : "w-20"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e8e0d4] dark:border-gray-700">
          <div
            className={`overflow-hidden transition-all ${isSidebarOpen ? "w-auto" : "w-0"}`}
          >
            <Logo size="sm" dark={!isDarkMode} className="text-2xl" />
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700 transition-colors"
          >
            <FaBars className="text-[#703B3B] dark:text-[#e8e0d4]" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
          >
            <FaTimes className="text-[#703B3B]" />
          </button>
        </div>

        {/* User Info */}
        <div
          className={`p-5 border-b border-[#e8e0d4] dark:border-gray-700 ${!isSidebarOpen && "text-center"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div
              className={`overflow-hidden transition-all ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}
            >
              <p className="font-semibold text-gray-800 dark:text-white">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {userRole}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {currentMenu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => `
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700"
                    }
                    ${!isSidebarOpen && "justify-center"}
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`transition-all ${!isSidebarOpen && "hidden"}`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e8e0d4] dark:border-gray-700">
            {/* Settings */}
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mb-2
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700"
                }
                ${!isSidebarOpen && "justify-center"}
              `}
            >
              <FaCog className="text-lg" />
              <span className={`transition-all ${!isSidebarOpen && "hidden"}`}>
                Settings
              </span>
            </NavLink>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 p-3 rounded-lg w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 ${!isSidebarOpen && "justify-center"}`}
            >
              <FaSignOutAlt className="text-lg" />
              <span className={`transition-all ${!isSidebarOpen && "hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
              >
                <FaBars className="text-[#703B3B] text-xl" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-64 dark:text-white"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <FaSun className="text-yellow-500" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <FaBell className="text-xl text-gray-600 dark:text-gray-300" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name || "User"}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-gray-500 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[#e8e0d4] dark:border-gray-700 py-2 z-50"
                    >
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#e8e0d4]/30 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <hr className="my-2 border-[#e8e0d4] dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {currentStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-[#e8e0d4] dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl text-[#703B3B]">{stat.icon}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith("+")
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Outlet - Child Routes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#e8e0d4] dark:border-gray-700 p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
