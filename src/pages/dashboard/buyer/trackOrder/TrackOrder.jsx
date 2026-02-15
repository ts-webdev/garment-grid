// pages/dashboard/buyer/TrackOrder.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaArrowLeft,
  FaShoppingBag,
  FaCreditCard,
  FaTimes,
  FaPrint,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import { GiSewingMachine, GiCutDiamond, GiRolledCloth } from "react-icons/gi";

import toast from "react-hot-toast";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Container from "../../../../components/shared/Container";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getData } = useAxios();
  const { user } = useAuth();
  const hasFetched = useRef(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Fetch order details
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchOrder = async () => {
      if (!orderId || !user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getData(`/bookings/${orderId}`);
        console.log("Order response:", response);

        // Handle response
        const orderData = response?.data || response;
        
        // Verify this order belongs to the user
        if (orderData?.email !== user.email) {
          setError("You don't have permission to view this order");
          setOrder(null);
        } else {
          setOrder(orderData);
          
          // Calculate active step based on status
          const statusSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];
          const currentIndex = statusSteps.indexOf(orderData?.status);
          setActiveStep(currentIndex >= 0 ? currentIndex : 0);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setError(error?.response?.data?.message || "Failed to load order details");
        toast.error("Could not load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      hasFetched.current = false;
    };
  }, [orderId, user?.email, getData]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      confirmed: "text-blue-600 bg-blue-100",
      processing: "text-purple-600 bg-purple-100",
      shipped: "text-indigo-600 bg-indigo-100",
      delivered: "text-green-600 bg-green-100",
      cancelled: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock />,
      confirmed: <FaCheckCircle />,
      processing: <FaSpinner className="animate-spin" />,
      shipped: <FaTruck />,
      delivered: <FaCheckCircle />,
      cancelled: <FaTimes />,
    };
    return icons[status] || <FaClock />;
  };

  // Timeline steps configuration
  const timelineSteps = [
    { key: "pending", label: "Order Placed", icon: <FaClock />, description: "Your order has been received" },
    { key: "confirmed", label: "Order Confirmed", icon: <FaCheckCircle />, description: "Order has been confirmed" },
    { key: "processing", label: "Processing", icon: <FaSpinner />, description: "Production in progress" },
    { key: "shipped", label: "Shipped", icon: <FaTruck />, description: "Order has been shipped" },
    { key: "delivered", label: "Delivered", icon: <FaCheckCircle />, description: "Order delivered successfully" },
  ];

  // Get step status
  const getStepStatus = (stepKey) => {
    if (!order) return "upcoming";
    
    const statusSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];
    const currentIndex = statusSteps.indexOf(order.status);
    const stepIndex = statusSteps.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-3xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#4d3d30] mb-2">
            {error || "Order Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The order you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/dashboard/my-orders"
            className="inline-flex items-center gap-2 bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
          >
            <FaArrowLeft />
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4d3d30] to-[#703B3B] -mt-6 -mx-6 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard/my-orders"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-2 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Back to Orders
            </Link>
            <h1 className="text-2xl font-bold text-white racing-sans flex items-center gap-2">
              <FaTruck />
              Track Order
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Order ID: <span className="font-mono">{order._id}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toast.success("Print feature coming soon")}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <FaPrint />
              Print
            </button>
            <button
              onClick={() => toast.success("Share feature coming soon")}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <FaShare />
              Share
            </button>
          </div>
        </div>
      </div>

      <Container>
        <div className="space-y-6">
          {/* Order Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Last updated: {formatDate(order.updatedAt || order.createdAt)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                <p className="font-semibold text-gray-800">
                  {order.status === "delivered" 
                    ? "Delivered" 
                    : order.estimatedDelivery || "Within 7-10 business days"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
          >
            <h2 className="text-lg font-semibold text-[#4d3d30] mb-6 flex items-center gap-2">
              <FaClock />
              Order Timeline
            </h2>

            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] transition-all duration-500"
                    style={{ width: `${(activeStep / (timelineSteps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {timelineSteps.map((step, index) => {
                    const status = getStepStatus(step.key);
                    return (
                      <div key={step.key} className="text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all ${
                            status === "completed"
                              ? "bg-green-500 text-white"
                              : status === "current"
                              ? "bg-[#703B3B] text-white scale-110 shadow-lg"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {status === "completed" ? <FaCheckCircle /> : step.icon}
                        </div>
                        <p className={`text-sm font-medium ${
                          status === "current" ? "text-[#703B3B]" : "text-gray-600"
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-4">
              {timelineSteps.map((step, index) => {
                const status = getStepStatus(step.key);
                return (
                  <div key={step.key} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        status === "completed"
                          ? "bg-green-500 text-white"
                          : status === "current"
                          ? "bg-[#703B3B] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {status === "completed" ? <FaCheckCircle /> : step.icon}
                    </div>
                    <div>
                      <p className={`font-medium ${
                        status === "current" ? "text-[#703B3B]" : "text-gray-800"
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                      {status === "current" && order.tracking?.[index] && (
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(order.tracking[index].date)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Tracking Details */}
          {order.tracking && order.tracking.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
            >
              <h2 className="text-lg font-semibold text-[#4d3d30] mb-4 flex items-center gap-2">
                <FaMapMarkerAlt />
                Tracking History
              </h2>
              <div className="space-y-4">
                {order.tracking.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[#703B3B] mt-1.5"></div>
                      {index < order.tracking.length - 1 && (
                        <div className="absolute top-4 left-1.5 w-0.5 h-12 bg-[#703B3B]/20"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="font-medium text-gray-800">{event.stage}</p>
                        <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                      </div>
                      {event.location && (
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                          <FaMapMarkerAlt className="text-xs" />
                          {event.location}
                        </p>
                      )}
                      {event.note && (
                        <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
            >
              <h2 className="text-lg font-semibold text-[#4d3d30] mb-4 flex items-center gap-2">
                <FaShoppingBag />
                Product Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Product Name</p>
                  <p className="font-medium text-gray-800">{order.productName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="font-medium text-gray-800">{order.quantity} pieces</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price per piece</p>
                    <p className="font-medium text-gray-800">{formatCurrency(order.pricePerPiece)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-[#703B3B]">{formatCurrency(order.totalPrice)}</p>
                </div>
              </div>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
            >
              <h2 className="text-lg font-semibold text-[#4d3d30] mb-4 flex items-center gap-2">
                <FaHome />
                Delivery Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="font-medium text-gray-800">
                    {order.firstName} {order.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Number</p>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaPhone className="text-xs" />
                    {order.contactNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaEnvelope className="text-xs" />
                    {order.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Delivery Address</p>
                  <p className="font-medium text-gray-800">{order.deliveryAddress}</p>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
            >
              <h2 className="text-lg font-semibold text-[#4d3d30] mb-4 flex items-center gap-2">
                <FaCreditCard />
                Payment Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-800">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Status</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === "paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.paymentStatus === "paid" ? <FaCheckCircle /> : <FaClock />}
                    {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </motion.div>

            {/* Additional Notes */}
            {order.additionalNotes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-[#e8e0d4] p-6"
              >
                <h2 className="text-lg font-semibold text-[#4d3d30] mb-4 flex items-center gap-2">
                  <FaClock />
                  Additional Notes
                </h2>
                <p className="text-gray-700">{order.additionalNotes}</p>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate("/dashboard/my-orders")}
              className="px-6 py-2 border border-[#e8e0d4] rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
            >
              Back to Orders
            </button>
            <button
              onClick={() => toast.success("Support team contacted")}
              className="px-6 py-2 bg-[#703B3B] text-white rounded-lg hover:bg-[#4d3d30] transition-colors"
            >
              Need Help?
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrackOrder;