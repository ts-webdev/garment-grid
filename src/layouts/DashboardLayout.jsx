import React, { useState, useEffect, useRef } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  FaStar,
  FaCreditCard,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New order received",
      time: "5 min ago",
      read: false,
      icon: <FaShoppingBag className="text-blue-500" />,
      link: "/dashboard/my-orders",
    },
    {
      id: 2,
      text: "Payment confirmed",
      time: "1 hour ago",
      read: false,
      icon: <FaCreditCard className="text-green-500" />,
      link: "/dashboard/my-orders",
    },
    {
      id: 3,
      text: "Order shipped",
      time: "2 hours ago",
      read: true,
      icon: <FaTruck className="text-purple-500" />,
      link: "/dashboard/track-order/123",
    },
  ]);

  // Get user role from auth
  const userRole = user?.role || "buyer";

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationOpen(false);
  }, [location.pathname]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
    setIsNotificationOpen(false);
  };

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Sidebar menu items based on role
  const menuItems = {
    admin: [
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", end: true },
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
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", end: true },
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
      { path: "/dashboard", icon: <FaHome />, label: "Dashboard", end: true },
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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  // Get user display name
  const getUserName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        className={`fixed top-0 left-0 z-50 h-full bg-white shadow-2xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${isSidebarOpen ? "w-72" : "w-20"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e8e0d4]">
          <div
            className={`overflow-hidden transition-all ${isSidebarOpen ? "w-auto" : "w-0"}`}
          >
            <Logo dark={true} size="sm" className="text-2xl" />
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
          >
            <FaBars className="text-[#703B3B]" />
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
          className={`p-5 border-b border-[#e8e0d4] ${!isSidebarOpen && "text-center"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {getUserInitials()}
            </div>
            <div
              className={`overflow-hidden transition-all ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}
            >
              <p className="font-semibold text-gray-800 truncate">
                {getUserName()}
              </p>
              <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {userRole}
              </p>
            </div>
          </div>

          {/* User Details - Only when sidebar is open */}
          {isSidebarOpen && user && (
            <div className="mt-3 pt-3 border-t border-[#e8e0d4] space-y-2 text-sm">
              {user.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-[#703B3B] text-xs" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPhone className="text-[#703B3B] text-xs" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.memberSince && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-[#703B3B] text-xs" />
                  <span>Member since {formatDate(user.memberSince)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 h-[calc(100vh-280px)] overflow-y-auto">
          <ul className="space-y-2">
            {currentMenu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white shadow-lg"
                        : "text-gray-600 hover:bg-[#e8e0d4]/30"
                    }
                    ${!isSidebarOpen && "justify-center"}
                  `}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span
                    className={`transition-all truncate ${!isSidebarOpen && "hidden"}`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e8e0d4] bg-white">
          {/* Settings */}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => `
              flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mb-2
              ${
                isActive
                  ? "bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white"
                  : "text-gray-600 hover:bg-[#e8e0d4]/30"
              }
              ${!isSidebarOpen && "justify-center"}
            `}
          >
            <FaCog className="text-lg flex-shrink-0" />
            <span
              className={`transition-all truncate ${!isSidebarOpen && "hidden"}`}
            >
              Settings
            </span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-red-600 hover:bg-red-50 transition-all duration-200 ${!isSidebarOpen && "justify-center"}`}
          >
            <FaSignOutAlt className="text-lg flex-shrink-0" />
            <span
              className={`transition-all truncate ${!isSidebarOpen && "hidden"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
              >
                <FaBars className="text-[#703B3B] text-xl" />
              </button>

              {/* Page Title */}
              <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
                {currentMenu.find((item) => item.path === location.pathname)
                  ?.label || "Dashboard"}
              </h2>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors relative"
                >
                  <FaBell className="text-xl text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-[#e8e0d4] py-2 z-50"
                    >
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-[#e8e0d4] flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          <FaBell className="text-[#703B3B]" />
                          Notifications
                          {unreadCount > 0 && (
                            <span className="bg-[#703B3B]/10 text-[#703B3B] text-xs px-2 py-1 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-xs text-[#703B3B] hover:underline"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <Link
                              key={notif.id}
                              to={notif.link}
                              onClick={() => {
                                markAsRead(notif.id);
                                setIsNotificationOpen(false);
                              }}
                              className={`block px-4 py-3 hover:bg-[#e8e0d4]/30 transition-colors ${
                                !notif.read ? "bg-[#e8e0d4]/20" : ""
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                  {notif.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800">
                                    {notif.text}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {notif.time}
                                  </p>
                                </div>
                                {!notif.read && (
                                  <span className="w-2 h-2 bg-[#703B3B] rounded-full flex-shrink-0 mt-2"></span>
                                )}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            <FaBell className="text-3xl mx-auto mb-2 text-gray-300" />
                            <p>No notifications</p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-[#e8e0d4]">
                          <Link
                            to="/dashboard/notifications"
                            onClick={() => setIsNotificationOpen(false)}
                            className="block text-center text-sm text-[#703B3B] hover:underline"
                          >
                            View all notifications
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {getUserInitials()}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 truncate max-w-[100px]">
                    {getUserName()}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-gray-500 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-[#e8e0d4] py-2 z-50"
                    >
                      {/* User Info in Dropdown */}
                      <div className="px-4 py-3 border-b border-[#e8e0d4]">
                        <p className="font-semibold text-gray-800">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-500 capitalize mt-1 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {userRole}
                        </p>
                      </div>

                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e8e0d4]/30"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <FaUserCircle className="text-[#703B3B]" />
                          Profile
                        </div>
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e8e0d4]/30"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <FaCog className="text-[#703B3B]" />
                          Settings
                        </div>
                      </Link>
                      <hr className="my-2 border-[#e8e0d4]" />
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <div className="flex items-center gap-2">
                          <FaSignOutAlt />
                          Logout
                        </div>
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
                className="bg-white rounded-xl p-5 shadow-sm border border-[#e8e0d4] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl text-[#703B3B]">{stat.icon}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith("+")
                        ? "bg-green-100 text-green-600"
                        : stat.change.startsWith("-")
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Outlet - Child Routes */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
