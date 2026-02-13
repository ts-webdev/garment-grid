import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaCamera, 
  FaLock, 
  FaGoogle, 
  FaArrowRight, 
  FaEye, 
  FaEyeSlash,
  FaBriefcase,
  FaShoppingBag
} from "react-icons/fa";
import Container from "../../components/shared/Container";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "buyer",
    status: "pending",
    password: ""
  });

  const [passwordErrors, setPasswordErrors] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasLength: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password validation
    if (name === "password") {
      setPasswordErrors({
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasLength: value.length >= 6
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Register functionality will be added later
    console.log("Register clicked", formData);
  };

  const handleGoogleRegister = () => {
    // Google register functionality will be added later
    console.log("Google register clicked");
  };

  const handlePhotoUpload = (e) => {
    // Photo upload functionality will be added later
    console.log("Photo selected", e.target.files[0]);
  };

  const isPasswordValid = () => {
    return passwordErrors.hasUppercase && 
           passwordErrors.hasLowercase && 
           passwordErrors.hasLength;
  };

  return (
    <div className=" bg-linear-to-br from-[#e8e0d4]/30 via-white to-[#e8e0d4]/30  pt-40 -mt-20 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          
          {/* Left Side - Branding & Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="racing-sans text-[#4d3d30]">Join</span>
                <br />
                <span className="text-[#703B3B] racing-sans">GarmentGrid</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Start your journey with the leading production tracking platform for garment manufacturers.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                "Streamlined production tracking",
                "Connect with global buyers",
                "Real-time order management",
                "Quality control insights"
              ].map((benefit, idx) => (
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
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Signals */}
            <div className="bg-white/50 p-6 rounded-xl border border-[#e8e0d4]">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#703B3B] to-[#4d3d30] border-2 border-white"
                    ></div>
                  ))}
                </div>
                <p className="text-sm font-medium text-[#4d3d30]">Join 500+ manufacturers</p>
              </div>
              <p className="text-xs text-gray-500">
                ✦ Trusted by leading brands worldwide ✦
              </p>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e8e0d4]">
              
              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#4d3d30] racing-sans">
                  Create Account
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Get started with GarmentGrid today
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

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

                {/* Photo URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCamera className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Leave empty to use default avatar
                  </p>
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {formData.role === "buyer" ? (
                        <FaShoppingBag className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaBriefcase className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-8 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50 appearance-none"
                    >
                      <option value="buyer">Buyer / Customer</option>
                      <option value="manager">Manager / Factory</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Role Description */}
                  <div className="mt-2">
                    {formData.role === "buyer" ? (
                      <div className="flex items-center gap-2 text-xs text-[#703B3B] bg-[#703B3B]/5 px-3 py-1.5 rounded-full">
                        <FaShoppingBag />
                        <span>Buyer: Place orders & track production</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#4d3d30] bg-[#4d3d30]/5 px-3 py-1.5 rounded-full">
                        <FaBriefcase />
                        <span>Manager: Add products & manage orders</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Field - Hidden (default: pending) */}
                <input type="hidden" name="status" value="pending" />

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

                  {/* Password Validation Rules */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-500">Password must contain:</p>
                    <div className="flex flex-wrap gap-3">
                      <div className={`flex items-center gap-1 text-xs ${passwordErrors.hasUppercase ? 'text-green-600' : 'text-gray-400'}`}>
                        <span>{passwordErrors.hasUppercase ? '✓' : '○'}</span>
                        <span>Uppercase</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${passwordErrors.hasLowercase ? 'text-green-600' : 'text-gray-400'}`}>
                        <span>{passwordErrors.hasLowercase ? '✓' : '○'}</span>
                        <span>Lowercase</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${passwordErrors.hasLength ? 'text-green-600' : 'text-gray-400'}`}>
                        <span>{passwordErrors.hasLength ? '✓' : '○'}</span>
                        <span>6+ characters</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isPasswordValid()}
                  className="w-full bg-[#4d3d30] hover:bg-[#703B3B] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4d3d30]"
                >
                  Create Account
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8e0d4]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or register with</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                onClick={handleGoogleRegister}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-[#e8e0d4] transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaGoogle className="text-[#703B3B] text-lg" />
                Continue with Google
                <span className="text-xs bg-[#e8e0d4] px-2 py-1 rounded-full text-gray-600 ml-2">
                  buyer • pending
                </span>
              </button>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-semibold text-[#703B3B] hover:text-[#4d3d30] transition-colors underline underline-offset-2"
                >
                  Sign in here
                </Link>
              </p>

              {/* Terms & Conditions */}
              <p className="mt-4 text-center text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-[#703B3B] hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#703B3B] hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Register;