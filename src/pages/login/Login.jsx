import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import Container from "../../components/shared/Container";
import Logo from "../../components/shared/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login functionality will be added later
    console.log("Login clicked", formData);
  };

  const handleGoogleLogin = () => {
    // Google login functionality will be added later
    console.log("Google login clicked");
  };

  return (
    <div className=" bg-linear-to-br from-[#e8e0d4]/30 via-white to-[#e8e0d4]/30  pt-40 -mt-20 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 ">
          
          {/* Left Side - Branding & Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="racing-sans text-[#4d3d30]">Welcome</span>
                <br />
                <span className="text-[#703B3B] racing-sans">Back!</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Track your orders, manage production, and stay connected with your manufacturing partners.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                "Real-time order tracking",
                "Production stage updates",
                "Instant notifications",
                "Secure payments"
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#703B3B]/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#703B3B]"></div>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-[#4d3d30]">500+</p>
                <p className="text-sm text-gray-500">Manufacturers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#4d3d30]">1.2M</p>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#4d3d30]">15+</p>
                <p className="text-sm text-gray-500">Countries</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e8e0d4]">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#4d3d30] racing-sans">
                  Sign In
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Access your GarmentGrid dashboard
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-12 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-[#703B3B]" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-[#703B3B]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#703B3B] focus:ring-[#703B3B] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-[#703B3B] hover:text-[#4d3d30] transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#4d3d30] hover:bg-[#703B3B] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Sign In
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8e0d4]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-[#e8e0d4] transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaGoogle className="text-[#703B3B] text-lg" />
                Sign in with Google
                <span className="text-xs bg-[#e8e0d4] px-2 py-1 rounded-full text-gray-600 ml-2">
                  buyer • pending
                </span>
              </button>

              {/* Register Link */}
              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-semibold text-[#703B3B] hover:text-[#4d3d30] transition-colors underline underline-offset-2"
                >
                  Create free account
                </Link>
              </p>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-[#e8e0d4]/30 rounded-lg border border-[#e8e0d4]">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#703B3B] rounded-full"></span>
                  Demo credentials:
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium">buyer@example.com</span> / buyer123</p>
                  <p><span className="font-medium">manager@example.com</span> / manager123</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Login;