// components/shared/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaEye, FaStar, FaStarHalfAlt } from "react-icons/fa";

const ProductCard = ({ product, index = 0 }) => {
  // Safety check - if no product, don't render
  if (!product) return null;

  // Rating stars component
  const RatingStars = ({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-xs" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
        <span className="text-xs text-gray-500 ml-1">({rating?.toFixed(1)})</span>
      </div>
    );
  };

  // Get image URL safely
  const imageUrl = product?.images?.thumbnail || product?.image || "https://via.placeholder.com/500";
  
  // Get quantity safely
  const quantity = product?.inventory?.available || product?.quantity || 0;
  
  // Get min order safely
  const minOrder = product?.inventory?.minOrder || product?.minOrder || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white rounded-xl overflow-hidden border border-[#e8e0d4] hover:border-[#703B3B]/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product?.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick View Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#703B3B]">
            MOQ: {minOrder} pcs
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-xs text-[#703B3B] font-medium mb-2">
            {product?.category || "Uncategorized"}
          </p>

          {/* Name */}
          <h3 className="text-lg font-bold text-[#4d3d30] mb-2 line-clamp-2">
            {product?.name || "Unnamed Product"}
          </h3>

          {/* Rating */}
          <RatingStars rating={product?.rating || 0} />

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mt-3 mb-4">
            <div>
              <p className="text-2xl font-bold text-[#703B3B]">
                ${product?.price?.toFixed(2) || "0.00"}
              </p>
              <p className="text-xs text-gray-500">per piece</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaBoxOpen className="text-[#4d3d30]" />
                <span className="font-medium">{quantity.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">available</p>
            </div>
          </div>

          {/* View Details Button */}
          <Link
            to={`/product/${product?._id}`}
            className="mt-auto w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <FaEye className="group-hover/btn:scale-110 transition-transform" />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;