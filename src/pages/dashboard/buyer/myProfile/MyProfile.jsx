// pages/dashboard/shared/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaCheckCircle,
  FaExclamationTriangle,
  FaKey,
  FaShieldAlt,
  FaIdCard,
  FaStar,
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";

import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    bio: "",
  });

  // Mock stats data - no API call
  const [stats] = useState({
    totalOrders: 12,
    completedOrders: 9,
    pendingOrders: 3,
    totalSpent: 1245.50,
    wishlistCount: 5,
    memberSince: new Date(),
  });

  // Initialize form data from auth user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.displayName || user?.name || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
        bio: user?.bio || "",
      });
    }
    setLoading(false);
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully (Demo Mode)");
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData({
      name: user?.displayName || user?.name || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      country: user?.country || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  // Get user role badge color
  const getRoleBadge = (role) => {
    const roles = {
      admin: "bg-purple-100 text-purple-800",
      manager: "bg-blue-100 text-blue-800",
      buyer: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return roles[role?.toLowerCase()] || roles.buyer;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4d3d30] racing-sans flex items-center gap-2">
            <FaUser className="text-[#703B3B]" />
            My Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your personal information and account settings
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white rounded-lg hover:from-[#703B3B] hover:to-[#4d3d30] transition-all duration-300"
          >
            <FaEdit />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-[#e8e0d4] rounded-lg hover:bg-[#e8e0d4]/30 transition-all"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white rounded-lg hover:from-[#703B3B] hover:to-[#4d3d30] transition-all duration-300 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] overflow-hidden sticky top-24"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#4d3d30] to-[#703B3B] p-6 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white mx-auto flex items-center justify-center text-white text-4xl font-bold">
                  {formData.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {isEditing && (
                  <button 
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#703B3B] hover:bg-gray-100 transition-colors"
                    onClick={() => toast.success("Photo upload feature coming soon")}
                  >
                    <FaCamera size={14} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-4">
                {formData.name || "User Name"}
              </h2>
              <p className="text-white/80 text-sm mt-1">{formData.email}</p>
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user?.role)}`}>
                  <FaIdCard />
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "Buyer"}
                </span>
                {user?.status === "suspended" && (
                  <span className="ml-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <FaExclamationTriangle />
                    Suspended
                  </span>
                )}
              </div>
            </div>

            {/* Profile Stats */}
            <div className="p-6 border-b border-[#e8e0d4]">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaStar className="text-[#703B3B]" />
                Account Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium text-gray-800">{formatDate(stats.memberSince)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Orders</span>
                  <span className="font-medium text-gray-800">{stats.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Completed Orders</span>
                  <span className="font-medium text-green-600">{stats.completedOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Pending Orders</span>
                  <span className="font-medium text-yellow-600">{stats.pendingOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Spent</span>
                  <span className="font-medium text-[#703B3B]">{formatCurrency(stats.totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Wishlist Items</span>
                  <span className="font-medium text-gray-800">{stats.wishlistCount}</span>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-[#703B3B]" />
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className={`${user?.status === 'active' ? 'text-green-500' : 'text-yellow-500'}`} />
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium capitalize ${user?.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user?.status || 'Active'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaKey className="text-[#703B3B]" />
                  <span className="text-gray-600">Email Verified:</span>
                  <span className="font-medium text-green-600">Yes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaShieldAlt className="text-[#703B3B]" />
                  <span className="text-gray-600">2FA Enabled:</span>
                  <span className="font-medium text-gray-800">No</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Profile Forms & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] overflow-hidden"
          >
            <div className="p-6 border-b border-[#e8e0d4]">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <FaUser className="text-[#703B3B]" />
                Personal Information
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      placeholder="+880 1234 567890"
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio / About Me
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                      placeholder="Tell us a little about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] overflow-hidden"
          >
            <div className="p-6 border-b border-[#e8e0d4]">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#703B3B]" />
                Address Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Street Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    placeholder="123 Main Street"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    placeholder="Dhaka"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent ${
                      !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
                    placeholder="Bangladesh"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] overflow-hidden"
          >
            <div className="p-6 border-b border-[#e8e0d4]">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <FaClock className="text-[#703B3B]" />
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Activity Items */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FaShoppingBag className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Order #12345 has been delivered</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaTruck className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Order #12346 has been shipped</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <FaCreditCard className="text-yellow-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Payment confirmed for order #12344</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="mt-4 text-sm text-[#703B3B] hover:underline"
                onClick={() => toast.success("Activity page coming soon")}
              >
                View all activity →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;