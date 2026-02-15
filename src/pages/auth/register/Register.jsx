// pages/auth/register/Register.jsx
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
  FaShoppingBag,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Container from "../../../components/shared/Container";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { register: registerUser, googleLogin, loading } = useAuth();
  const { postData } = useAxios(); // ✅ For saving user to database

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // ✅ react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "buyer",
      status: "pending",
    },
  });

  // ✅ password live validation
  const passwordValue = watch("password", "");

  const passwordErrors = {
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasLength: passwordValue.length >= 6,
  };

  const isPasswordValid =
    passwordErrors.hasUppercase &&
    passwordErrors.hasLowercase &&
    passwordErrors.hasLength;

  // ✅ Save user to database function
  const saveUserToDatabase = async (userData) => {
    try {
      const response = await postData("/users", userData);
      console.log("User saved to DB:", response);
      return response;
    } catch (error) {
      console.error("Failed to save user to DB:", error);
      // Don't throw error - user already created in Firebase
      // Just log it and continue
    }
  };

  // ✅ Register submit
  const onSubmit = async (data) => {
    try {
      // 1. Register in Firebase
      const result = await registerUser(data.email, data.password, data.name, data.photoURL);
      
      if (result?.user) {
        // 2. Prepare user data for database
        const userData = {
          uid: result.user.uid,
          name: data.name,
          email: data.email,
          photoURL: data.photoURL || "",
          role: data.role,
          status: "pending", // Default status
          phone: "",
          address: "",
          city: "",
          country: "",
          bio: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // 3. Save to MongoDB
        await saveUserToDatabase(userData);

        toast.success("Registration successful! Your account is pending approval.");
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  // ✅ Google register
  const handleGoogleRegister = async () => {
    try {
      // 1. Login with Google in Firebase
      const result = await googleLogin();
      
      if (result?.user) {
        // 2. Prepare user data for database
        const userData = {
          uid: result.user.uid,
          name: result.user.displayName || "",
          email: result.user.email,
          photoURL: result.user.photoURL || "",
          role: "buyer", // Default role for Google signup
          status: "pending", // Default status
          phone: "",
          address: "",
          city: "",
          country: "",
          bio: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // 3. Save to MongoDB
        await saveUserToDatabase(userData);

        toast.success("Google login successful! Your account is pending approval.");
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#e8e0d4]/30 via-white to-[#e8e0d4]/30 pt-40 -mt-20 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          {/* Left Side */}
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
                Start your journey with the leading production tracking
                platform.
              </p>
              
              {/* Features List */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">Access to all features</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e8e0d4]">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#4d3d30] racing-sans">
                  Create Account
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Join 500+ manufacturers worldwide
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo URL
                  </label>
                  <div className="relative">
                    <FaCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("photoURL")}
                      className="w-full pl-10 pr-4 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional - a default avatar will be used if not provided
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I want to register as <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      watch("role") === "buyer" 
                        ? "border-[#703B3B] bg-[#703B3B]/5 text-[#703B3B]" 
                        : "border-[#e8e0d4] hover:border-[#703B3B]"
                    }`}>
                      <input
                        type="radio"
                        value="buyer"
                        {...register("role")}
                        className="hidden"
                      />
                      <FaShoppingBag />
                      <span>Buyer</span>
                    </label>
                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      watch("role") === "manager" 
                        ? "border-[#703B3B] bg-[#703B3B]/5 text-[#703B3B]" 
                        : "border-[#e8e0d4] hover:border-[#703B3B]"
                    }`}>
                      <input
                        type="radio"
                        value="manager"
                        {...register("role")}
                        className="hidden"
                      />
                      <FaBriefcase />
                      <span>Manager</span>
                    </label>
                  </div>
                </div>

                {/* Hidden status field */}
                <input type="hidden" {...register("status")} value="pending" />

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                          message: "Password must contain uppercase and lowercase letters"
                        }
                      })}
                      className="w-full pl-10 pr-12 py-2 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#703B3B]"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Password Rules */}
                <div className="bg-[#e8e0d4]/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-600 mb-2">Password must contain:</p>
                  <div className="grid grid-cols-1 gap-1">
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        passwordErrors.hasUppercase
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span>{passwordErrors.hasUppercase ? "✓" : "○"}</span>
                      Uppercase letter
                    </p>
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        passwordErrors.hasLowercase
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span>{passwordErrors.hasLowercase ? "✓" : "○"}</span>
                      Lowercase letter
                    </p>
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        passwordErrors.hasLength
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span>{passwordErrors.hasLength ? "✓" : "○"}</span>
                      Minimum 6 characters
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#703B3B] hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-[#703B3B] hover:underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isPasswordValid || loading}
                  className="w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
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

              {/* Google */}
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-[#e8e0d4] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <FaGoogle className="text-[#703B3B]" />
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
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Register;