import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaMoneyBillWave,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaComment,
  FaTimes,
  FaStar,
  FaStarHalfAlt,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import { GiSewingMachine, GiCutDiamond, GiRolledCloth } from "react-icons/gi";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxios from "../../hooks/useAxios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getData } = useAxios();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [quantity, setQuantity] = useState(50);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    deliveryAddress: "",
    additionalNotes: "",
  });

  // Mock user state - will be replaced with actual auth
  const [user, setUser] = useState({
    isLoggedIn: true,
    email: "john.doe@example.com",
    role: "buyer",
    status: "active",
  });

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getData(`/products/${id}`);
        console.log("API Response:", data);
        
        // Handle different API response structures
        if (data?.data) {
          setProduct(data.data);
          setQuantity(data.data?.inventory?.minOrder || data.data?.minOrder || 50);
        } else if (data?.product) {
          setProduct(data.product);
          setQuantity(data.product?.inventory?.minOrder || data.product?.minOrder || 50);
        } else {
          setProduct(data);
          setQuantity(data?.inventory?.minOrder || data?.minOrder || 50);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type) => {
    if (!product) return;
    
    const maxQty = product?.inventory?.available || product?.quantity || 0;
    const minQty = product?.inventory?.minOrder || product?.minOrder || 1;
    
    if (type === "increment" && quantity < maxQty) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > minQty) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Booking logic will be added later
    console.log("Booking submitted:", {
      productId: product._id,
      productName: product.name,
      quantity,
      totalPrice: quantity * (product?.price || 0),
      ...formData,
      userEmail: user.email,
    });

    // Redirect to payment if needed
    if (product?.paymentOptions?.includes("Stripe")) {
      navigate("/payment");
    } else {
      // Show success message and redirect to dashboard
      navigate("/dashboard/my-orders");
    }
  };

  const canPlaceOrder = () => {
    return user.isLoggedIn && user.role === "buyer" && user.status === "active";
  };

  // Get values with fallbacks
  const productName = product?.name || "";
  const productCategory = product?.category || "";
  const productPrice = product?.price || 0;
  const productDescription = product?.description || "";
  const productRating = product?.rating || 0;
  const productReviews = product?.reviewsCount || product?.reviews || 0;
  const productQuantity = product?.inventory?.available || product?.quantity || 0;
  const productMinOrder = product?.inventory?.minOrder || product?.minOrder || 1;
  const productImages = product?.images?.gallery || product?.images || [];
  const productThumbnail = product?.images?.thumbnail || productImages[0] || "";
  const productPaymentOptions = product?.paymentOptions || [];
  const productSpecs = product?.specifications || {};
  const productDemoVideo = product?.video?.demo || product?.demoVideo || "";
  
  const totalPrice = quantity * productPrice;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#4d3d30] mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/all-products"
            className="bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#4d3d30] mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/all-products"
            className="bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4d3d30] to-[#703B3B] text-white py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
        </div>

        <Container>
          <div className="relative z-10">
            <Link
              to="/all-products"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <FaArrowLeft className="text-sm" />
              Back to Products
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold racing-sans">
              Product <span className="text-[#e8e0d4]">Details</span>
            </h1>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                {/* Main Image */}
                <div className="bg-[#e8e0d4]/10 rounded-2xl overflow-hidden mb-4 border border-[#e8e0d4]">
                  <img
                    src={productImages[selectedImage] || productThumbnail}
                    alt={productName}
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {productImages.slice(0, 4).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-[#703B3B] scale-105"
                            : "border-transparent hover:border-[#e8e0d4]"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Demo Video Link */}
                {productDemoVideo && (
                  <div className="mt-6 p-4 bg-[#e8e0d4]/10 rounded-lg border border-[#e8e0d4]">
                    <p className="text-sm font-medium text-[#4d3d30] mb-2">
                      Product Demo Video
                    </p>
                    <a
                      href={productDemoVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#703B3B] hover:text-[#4d3d30] text-sm flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 15l5-3-5-3v6z" />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <p className="text-sm text-[#703B3B] font-medium mb-2">
                {productCategory}
              </p>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[#4d3d30] mb-4">
                {productName}
              </h1>

              {/* Rating */}
              {productRating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) =>
                      i < Math.floor(productRating) ? (
                        <FaStar key={i} className="text-yellow-400" />
                      ) : i < productRating ? (
                        <FaStarHalfAlt key={i} className="text-yellow-400" />
                      ) : (
                        <FaStar key={i} className="text-gray-300" />
                      ),
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({productReviews} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#703B3B]">
                  ${productPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">per piece</span>
              </div>

              {/* Description */}
              {productDescription && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#4d3d30] mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {productDescription}
                  </p>
                </div>
              )}

              {/* Availability */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#e8e0d4]/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-[#4d3d30] mb-1">
                    <FaBoxOpen />
                    <span className="font-medium">Available</span>
                  </div>
                  <p className="text-2xl font-bold text-[#703B3B]">
                    {productQuantity.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">pieces in stock</p>
                </div>
                <div className="bg-[#e8e0d4]/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-[#4d3d30] mb-1">
                    <GiSewingMachine />
                    <span className="font-medium">Min. Order</span>
                  </div>
                  <p className="text-2xl font-bold text-[#703B3B]">
                    {productMinOrder}
                  </p>
                  <p className="text-xs text-gray-500">pieces minimum</p>
                </div>
              </div>

              {/* Payment Options */}
              {productPaymentOptions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#4d3d30] mb-3">
                    Payment Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productPaymentOptions.map((option, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-[#e8e0d4] rounded-full text-sm text-gray-600"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {Object.keys(productSpecs).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#4d3d30] mb-3">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(productSpecs).map(([key, value]) => {
                      if (Array.isArray(value)) {
                        return (
                          <div key={key}>
                            <p className="text-xs text-gray-500 capitalize">
                              {key}
                            </p>
                            <p className="text-sm font-medium">
                              {value.join(", ")}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">
                            {key}
                          </p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Button */}
              {canPlaceOrder() ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                >
                  <FaShoppingBag />
                  Place Order
                </button>
              ) : (
                <div className="space-y-3">
                  {!user.isLoggedIn ? (
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-700 mb-2">
                        Please login to place order
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Link
                          to="/login"
                          className="bg-[#703B3B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4d3d30] transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="border border-[#703B3B] text-[#703B3B] px-4 py-2 rounded-lg text-sm hover:bg-[#703B3B] hover:text-white transition-colors"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ) : user.role !== "buyer" ? (
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-700">
                        Managers and Admins cannot place orders
                      </p>
                    </div>
                  ) : user.status !== "active" ? (
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-700">
                        Your account is pending or suspended. Please contact
                        support.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowBookingForm(false)}
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
                  Order Booking Form
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="w-8 h-8 rounded-full bg-[#e8e0d4]/30 flex items-center justify-center hover:bg-[#703B3B]/10 transition-colors"
                >
                  <FaTimes className="text-[#703B3B]" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
                {/* Read-only fields */}
                <div className="bg-[#e8e0d4]/20 p-4 rounded-lg space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2 text-[#4d3d30] font-medium">
                      <FaEnvelope className="text-[#703B3B]" />
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Product
                    </label>
                    <div className="flex items-center gap-2 text-[#4d3d30] font-medium">
                      <FaShoppingBag className="text-[#703B3B]" />
                      {productName}
                    </div>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Quantity *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#e8e0d4] rounded-lg">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("decrement")}
                        className="px-4 py-2 hover:bg-[#e8e0d4]/30 transition-colors"
                      >
                        <FaMinus className="text-[#703B3B] text-sm" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.min(
                              productQuantity,
                              Math.max(
                                productMinOrder,
                                parseInt(e.target.value) || productMinOrder,
                              ),
                            ),
                          )
                        }
                        min={productMinOrder}
                        max={productQuantity}
                        className="w-20 text-center border-x border-[#e8e0d4] py-2 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("increment")}
                        className="px-4 py-2 hover:bg-[#e8e0d4]/30 transition-colors"
                      >
                        <FaPlus className="text-[#703B3B] text-sm" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Min: {productMinOrder} | Max: {productQuantity}
                    </p>
                  </div>
                </div>

                {/* Order Price (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Price
                  </label>
                  <div className="bg-[#e8e0d4]/20 px-4 py-3 rounded-lg flex items-center justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-2xl font-bold text-[#703B3B]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Price per piece: ${productPrice.toFixed(2)}
                  </p>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                      placeholder="+880 1234 567890"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full pl-10 pr-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                      placeholder="Street address, city, postal code"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes / Instructions
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                      placeholder="Any special requirements or instructions..."
                    />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-[#e8e0d4]/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[#4d3d30] mb-2">
                    Payment Method
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    You will be redirected to payment page after submission.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaShieldAlt className="text-[#703B3B]" />
                    Secure transaction
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    Submit Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-6 py-3 border border-[#e8e0d4] rounded-lg hover:bg-[#e8e0d4]/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-16 bg-[#e8e0d4]/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#703B3B]/10 flex items-center justify-center mx-auto mb-4">
                <GiCutDiamond className="text-3xl text-[#703B3B]" />
              </div>
              <h3 className="text-lg font-bold text-[#4d3d30] mb-2">
                Premium Quality
              </h3>
              <p className="text-sm text-gray-600">
                Highest quality materials and craftsmanship
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#703B3B]/10 flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-3xl text-[#703B3B]" />
              </div>
              <h3 className="text-lg font-bold text-[#4d3d30] mb-2">
                Global Shipping
              </h3>
              <p className="text-sm text-gray-600">
                Fast and reliable shipping worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#703B3B]/10 flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-3xl text-[#703B3B]" />
              </div>
              <h3 className="text-lg font-bold text-[#4d3d30] mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-600">
                Dedicated support team for all inquiries
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetails;