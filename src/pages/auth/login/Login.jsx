import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Container from "../../../components/shared/Container";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, googleLogin, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // ✅ react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Email login
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      // 🔴 TODO: save user to DB (if new)

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-linear-to-br from-[#e8e0d4]/30 via-white to-[#e8e0d4]/30 pt-40 -mt-20 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side */}
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
                Track your orders, manage production, and stay connected with
                your manufacturing partners.
              </p>
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
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#4d3d30] racing-sans">
                  Sign In
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Access your GarmentGrid dashboard
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
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
                      {...register("email", { required: "Email is required" })}
                      className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
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
                      {...register("password", {
                        required: "Password is required",
                      })}
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
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4d3d30] hover:bg-[#703B3B] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8e0d4]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google */}
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
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
