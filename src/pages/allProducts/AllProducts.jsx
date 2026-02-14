import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes,
  FaChevronDown,
  FaBoxOpen,
  FaShoppingBag,
  FaEye,
  FaSortAmountDown,
  FaSortAmountUp,
  FaStar,
  FaStarHalfAlt
} from "react-icons/fa";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";

// Temporary mock data - will be replaced with MongoDB data later
const mockProducts = [
  {
    _id: "1",
    name: "Premium Cotton T-Shirt",
    category: "T-Shirts",
    price: 12.99,
    quantity: 1500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.5,
    minOrder: 50,
    description: "High-quality cotton t-shirt, perfect for everyday wear"
  },
  {
    _id: "2",
    name: "Classic Denim Jacket",
    category: "Jackets",
    price: 45.99,
    quantity: 500,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
    rating: 4.8,
    minOrder: 25,
    description: "Vintage style denim jacket with premium finish"
  },
  {
    _id: "3",
    name: "Slim Fit Chinos",
    category: "Pants",
    price: 29.99,
    quantity: 800,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    rating: 4.3,
    minOrder: 40,
    description: "Comfortable slim fit chinos for casual and formal wear"
  },
  {
    _id: "4",
    name: "Hooded Sweatshirt",
    category: "Hoodies",
    price: 34.99,
    quantity: 600,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    rating: 4.6,
    minOrder: 30,
    description: "Warm and comfortable hoodie with kangaroo pocket"
  },
  {
    _id: "5",
    name: "Summer Linen Shirt",
    category: "Shirts",
    price: 24.99,
    quantity: 700,
    image: "https://images.unsplash.com/photo-1598033121418-5e17a7c3b1d9?w=500",
    rating: 4.4,
    minOrder: 35,
    description: "Breathable linen shirt perfect for summer"
  },
  {
    _id: "6",
    name: "Cargo Pants",
    category: "Pants",
    price: 39.99,
    quantity: 450,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    rating: 4.2,
    minOrder: 30,
    description: "Durable cargo pants with multiple pockets"
  },
  {
    _id: "7",
    name: "Wool Blend Coat",
    category: "Jackets",
    price: 89.99,
    quantity: 200,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
    rating: 4.9,
    minOrder: 15,
    description: "Elegant wool blend coat for winter"
  },
  {
    _id: "8",
    name: "Polo Shirt",
    category: "T-Shirts",
    price: 18.99,
    quantity: 1200,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
    rating: 4.5,
    minOrder: 50,
    description: "Classic polo shirt with embroidered logo"
  },
  {
    _id: "9",
    name: "Leather Jacket",
    category: "Jackets",
    price: 149.99,
    quantity: 150,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    rating: 4.7,
    minOrder: 10,
    description: "Genuine leather jacket with modern design"
  },
  {
    _id: "10",
    name: "Sweatpants",
    category: "Pants",
    price: 22.99,
    quantity: 900,
    image: "https://images.unsplash.com/photo-1556902458-ce87af7e7ab3?w=500",
    rating: 4.1,
    minOrder: 40,
    description: "Comfortable sweatpants for lounging"
  },
  {
    _id: "11",
    name: "Denim Shirt",
    category: "Shirts",
    price: 32.99,
    quantity: 400,
    image: "https://images.unsplash.com/photo-1598033121418-5e17a7c3b1d9?w=500",
    rating: 4.3,
    minOrder: 25,
    description: "Classic denim shirt, goes with everything"
  },
  {
    _id: "12",
    name: "Track Jacket",
    category: "Jackets",
    price: 42.99,
    quantity: 350,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    rating: 4.4,
    minOrder: 30,
    description: "Sporty track jacket with stripes"
  }
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Get unique categories
  const categories = ["All", ...new Set(mockProducts.map(p => p.category))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Apply sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "quantity") {
      result.sort((a, b) => b.quantity - a.quantity);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
    setPriceRange({ min: 0, max: 200 });
  };

  // Rating stars component
  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-xs" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-xs" />}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen mt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4d3d30] to-[#703B3B] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
        </div>
        
        <Container>
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 racing-sans">
                All <span className="text-[#e8e0d4]">Products</span>
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Browse our collection of premium garments and accessories
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full lg:w-96">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#703B3B]"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#e8e0d4] rounded-lg bg-white"
              >
                <FaFilter className="text-[#703B3B]" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Sort Dropdown */}
              <div className="relative w-full lg:w-64">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8e0d4] rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#703B3B]"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="quantity">Quantity: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filters Section */}
            <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-[#e8e0d4]/10 p-6 rounded-lg border border-[#e8e0d4]">
                <div className="flex flex-wrap items-center gap-6">
                  {/* Category Filter */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? "bg-[#703B3B] text-white"
                              : "bg-white border border-[#e8e0d4] text-gray-600 hover:border-[#703B3B] hover:text-[#703B3B]"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="flex-1 min-w-[250px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ${priceRange.min} - ${priceRange.max}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                        className="w-full accent-[#703B3B]"
                      />
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full accent-[#703B3B]"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-[#703B3B] hover:text-[#4d3d30] font-medium underline underline-offset-2"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-bold text-[#4d3d30] mb-2">No Products Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
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
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Quick View Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#703B3B]">
                          MOQ: {product.minOrder} pcs
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Category */}
                        <p className="text-xs text-[#703B3B] font-medium mb-2">
                          {product.category}
                        </p>

                        {/* Name */}
                        <h3 className="text-lg font-bold text-[#4d3d30] mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <RatingStars rating={product.rating} />

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-3 mb-4">
                          <div>
                            <p className="text-2xl font-bold text-[#703B3B]">
                              ${product.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">per piece</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <FaBoxOpen className="text-[#4d3d30]" />
                              <span className="font-medium">{product.quantity.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500">available</p>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <Link
                          to={`/product/${product._id}`}
                          className="mt-auto w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <FaEye className="group-hover/btn:scale-110 transition-transform" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-lg border border-[#e8e0d4] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#703B3B] hover:text-[#703B3B] transition-colors"
                  >
                    ←
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-lg border border-[#e8e0d4] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#703B3B] hover:text-[#703B3B] transition-colors"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white mt-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 racing-sans">
              Looking for Bulk Orders?
            </h2>
            <p className="text-white/90 mb-8">
              Contact our sales team for special pricing on large quantities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#e8e0d4] text-[#4d3d30] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300"
              >
                Request Quote
              </Link>
              <Link
                to="/register"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AllProducts;