import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes,
  FaChevronDown,
  FaBoxOpen
} from "react-icons/fa";
import Container from "../../components/shared/Container";
import ProductCard from "../../components/shared/ProductCard";
import useAxios from "../../hooks/useAxios";

const AllProducts = () => {
  const { getData } = useAxios();
  
  const [products, setProducts] = useState([]); // ✅ Default empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null); // ✅ Error state
  const productsPerPage = 8;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getData("/products");
        console.log("API Response:", data); // ✅ Debug: check what API returns
        
        // ✅ Safety check: ensure data is array
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else if (data?.data && Array.isArray(data.data)) {
          // If API returns { data: [...] }
          setProducts(data.data);
          setFilteredProducts(data.data);
        } else if (data?.products && Array.isArray(data.products)) {
          // If API returns { products: [...] }
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          console.error("API did not return array:", data);
          setProducts([]);
          setFilteredProducts([]);
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error?.response?.data?.message || "Failed to load products");
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories - with safety check
  const categories = products?.length > 0 
    ? ["All", ...new Set(products.map(p => p?.category).filter(Boolean))]
    : ["All"];

  // Filter and sort products
  useEffect(() => {
    if (!products?.length) return;
    
    let result = [...products];

    // Apply search
    if (searchTerm) {
      result = result.filter(p => 
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p?.category === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(p => p?.price >= priceRange.min && p?.price <= priceRange.max);

    // Apply sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => (a?.price || 0) - (b?.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b?.price || 0) - (a?.price || 0));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
    } else if (sortBy === "quantity") {
      result.sort((a, b) => (b?.inventory?.available || b?.quantity || 0) - (a?.inventory?.available || a?.quantity || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
    setPriceRange({ min: 0, max: 200 });
  };

  // Error display
  if (error) {
    return (
      <div className="min-h-screen mt-20">
        <Container>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-[#4d3d30] mb-2">Error Loading Products</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#703B3B] text-white px-6 py-2 rounded-lg hover:bg-[#4d3d30] transition-colors"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

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
                  {categories.length > 1 && (
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
                  )}

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
              Showing {filteredProducts?.length > 0 ? indexOfFirstProduct + 1 : 0} - {Math.min(indexOfLastProduct, filteredProducts?.length || 0)} of {filteredProducts?.length || 0} products
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-[#e8e0d4] border-t-[#703B3B] rounded-full animate-spin"></div>
            </div>
          ) : !filteredProducts?.length ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                  <ProductCard key={product?._id || index} product={product} index={index} />
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