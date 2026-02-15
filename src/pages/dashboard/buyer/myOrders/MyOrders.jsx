// pages/dashboard/buyer/MyOrders.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBan,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShoppingBag,
} from "react-icons/fa";



import toast from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const { getData, deleteData } = useAxios();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getData(`/bookings/user/${user.email}`);
        console.log("Orders response:", response);

        // Handle different response structures
        const ordersData = response?.data || response || [];
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(error?.response?.data?.message || "Failed to load orders");
        toast.error("Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email, getData]);

  // Apply filters
  useEffect(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.productName?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      if (dateFilter === "today") {
        filterDate.setHours(0, 0, 0, 0);
        filtered = filtered.filter(
          (order) => new Date(order.createdAt) >= filterDate,
        );
      } else if (dateFilter === "week") {
        filterDate.setDate(now.getDate() - 7);
        filtered = filtered.filter(
          (order) => new Date(order.createdAt) >= filterDate,
        );
      } else if (dateFilter === "month") {
        filterDate.setMonth(now.getMonth() - 1);
        filtered = filtered.filter(
          (order) => new Date(order.createdAt) >= filterDate,
        );
      }
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!cancelOrderId) return;

    setCancelling(true);
    try {
      const response = await deleteData(`/bookings/${cancelOrderId}`);

      if (response?.success) {
        toast.success("Order cancelled successfully");

        // Update local state
        const updatedOrders = orders.map((order) =>
          order._id === cancelOrderId
            ? { ...order, status: "cancelled" }
            : order,
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
      setShowCancelModal(false);
      setCancelOrderId(null);
    }
  };

  // Open cancel modal
  const openCancelModal = (orderId) => {
    setCancelOrderId(orderId);
    setShowCancelModal(true);
  };

  // Open details modal
  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <FaClock />,
        label: "Pending",
      },
      confirmed: {
        color: "bg-blue-100 text-blue-800",
        icon: <FaCheckCircle />,
        label: "Confirmed",
      },
      processing: {
        color: "bg-purple-100 text-purple-800",
        icon: <FaSpinner />,
        label: "Processing",
      },
      shipped: {
        color: "bg-indigo-100 text-indigo-800",
        icon: <FaTruck />,
        label: "Shipped",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <FaCheckCircle />,
        label: "Delivered",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <FaBan />,
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Payment badge component
  const PaymentBadge = ({ method, status }) => {
    const isPaid = status === "paid";

    return (
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{method}</span>
        <span
          className={`text-xs font-medium ${isPaid ? "text-green-600" : "text-yellow-600"}`}
        >
          {isPaid ? "Paid" : "Pending"}
        </span>
      </div>
    );
  };

  // Order ID shortener
  const shortenId = (id) => {
    if (!id) return "N/A";
    return `${id.substring(0, 8)}...`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4d3d30] to-[#703B3B] -mt-6 -mx-6 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white racing-sans flex items-center gap-2">
              <FaShoppingBag />
              My Orders
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Track and manage your orders
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {}}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <FaDownload />
              Export
            </button>
            <button
              onClick={() => {}}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="md:w-48">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-[#703B3B] hover:text-[#4d3d30] font-medium underline underline-offset-2"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Info */}
        <div className="text-sm text-gray-500">
          Showing {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} -{" "}
          {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-[#4d3d30] mb-2">
            Error Loading Orders
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-[#e8e0d4]/10 rounded-lg">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-[#4d3d30] mb-2">
            No Orders Found
          </h3>
          <p className="text-gray-600 mb-6">
            {orders.length === 0
              ? "You haven't placed any orders yet."
              : "No orders match your filters."}
          </p>
          {orders.length > 0 ? (
            <button
              onClick={clearFilters}
              className="bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <Link
              to="/all-products"
              className="inline-block bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
            >
              Browse Products
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#e8e0d4]/30 border-b border-[#e8e0d4]">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Product
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Quantity
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Payment
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[#4d3d30]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#e8e0d4] hover:bg-[#e8e0d4]/10 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="text-sm font-mono text-[#703B3B]">
                        {shortenId(order._id)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800">
                        {order.productName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(order.pricePerPiece)} per piece
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold">{order.quantity}</span>
                      <div className="text-xs text-gray-500">
                        Total: {formatCurrency(order.totalPrice)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-4">
                      <PaymentBadge
                        method={order.paymentMethod}
                        status={order.paymentStatus}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openDetailsModal(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {order.status === "pending" && (
                          <button
                            onClick={() => openCancelModal(order._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Order"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {currentItems.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#e8e0d4] rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Order ID</span>
                    <p className="text-sm font-mono text-[#703B3B]">
                      {shortenId(order._id)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="mb-3">
                  <p className="font-medium text-gray-800">
                    {order.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(order.pricePerPiece)} × {order.quantity} ={" "}
                    {formatCurrency(order.totalPrice)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <p className="font-medium">{order.paymentMethod}</p>
                    <span
                      className={`text-xs ${order.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e8e0d4]">
                  <button
                    onClick={() => openDetailsModal(order)}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    View
                  </button>
                  {order.status === "pending" && (
                    <button
                      onClick={() => openCancelModal(order._id)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-[#e8e0d4] rounded-lg disabled:opacity-50 hover:border-[#703B3B] transition-colors"
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? "bg-[#703B3B] text-white"
                        : "border border-[#e8e0d4] hover:border-[#703B3B] hover:text-[#703B3B]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#e8e0d4] rounded-lg disabled:opacity-50 hover:border-[#703B3B] transition-colors"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e8e0d4] flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-[#4d3d30]">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 rounded-full bg-[#e8e0d4]/30 flex items-center justify-center hover:bg-[#703B3B]/10 transition-colors"
                >
                  <FaTimes className="text-[#703B3B]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div className="bg-[#e8e0d4]/10 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-mono text-[#703B3B]">
                        {selectedOrder._id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p>{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <StatusBadge status={selectedOrder.status} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="text-sm">{selectedOrder.paymentMethod}</p>
                      <p
                        className={`text-xs ${selectedOrder.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {selectedOrder.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-[#4d3d30] mb-3">
                    Product Information
                  </h3>
                  <div className="bg-[#e8e0d4]/10 p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-[#e8e0d4] rounded-lg flex items-center justify-center">
                        <FaBoxOpen className="text-3xl text-[#703B3B]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {selectedOrder.productName}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Price:</span>
                            <p className="font-semibold">
                              {formatCurrency(selectedOrder.pricePerPiece)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Quantity:</span>
                            <p className="font-semibold">
                              {selectedOrder.quantity}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Total:</span>
                            <p className="text-lg font-bold text-[#703B3B]">
                              {formatCurrency(selectedOrder.totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-[#4d3d30] mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-[#e8e0d4]/10 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium">
                          {selectedOrder.firstName} {selectedOrder.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{selectedOrder.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">
                          {selectedOrder.contactNumber}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">
                          Delivery Address
                        </p>
                        <p className="font-medium">
                          {selectedOrder.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                {selectedOrder.additionalNotes && (
                  <div>
                    <h3 className="font-semibold text-[#4d3d30] mb-3">
                      Additional Notes
                    </h3>
                    <div className="bg-[#e8e0d4]/10 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {selectedOrder.additionalNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tracking Timeline */}
                {selectedOrder.tracking &&
                  selectedOrder.tracking.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[#4d3d30] mb-3">
                        Tracking Timeline
                      </h3>
                      <div className="bg-[#e8e0d4]/10 p-4 rounded-lg">
                        <div className="space-y-4">
                          {selectedOrder.tracking.map((event, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="relative">
                                <div className="w-4 h-4 rounded-full bg-[#703B3B] mt-1"></div>
                                {index < selectedOrder.tracking.length - 1 && (
                                  <div className="absolute top-4 left-2 w-0.5 h-12 bg-[#703B3B]/20"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">
                                  {event.stage}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {event.location}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {new Date(event.date).toLocaleString()}
                                </p>
                                {event.note && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {event.note}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Close Button */}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white py-3 rounded-lg font-semibold hover:from-[#703B3B] hover:to-[#4d3d30] transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-3xl text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-center text-[#4d3d30] mb-2">
                  Cancel Order?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Are you sure you want to cancel this order? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-2 border border-[#e8e0d4] rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
                  >
                    No, Keep It
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cancelling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Cancelling...
                      </>
                    ) : (
                      "Yes, Cancel"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
