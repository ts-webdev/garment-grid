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
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { register: registerUser, googleLogin, loading } = useAuth();

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

  //  Register submit
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.name, data.photoURL);

      // 🔴 TODO: save user to DB
      // role: data.role
      // status: pending

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Google register
  const handleGoogleRegister = async () => {
    try {
      await googleLogin();

      // 🔴 TODO: save user to DB

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-linear-to-br from-[#e8e0d4]/30 via-white to-[#e8e0d4]/30 pt-40 -mt-20 pb-20">
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
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="label-text">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
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
                  <label className="label-text">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full"
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
                  <label className="label-text">Photo URL</label>
                  <input
                    {...register("photoURL")}
                    className="input input-bordered w-full"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="label-text">Role</label>
                  <select
                    {...register("role")}
                    className="select select-bordered w-full"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="label-text">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="input input-bordered w-full pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Password Rules */}
                <div className="text-xs space-y-1">
                  <p
                    className={
                      passwordErrors.hasUppercase
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Uppercase letter
                  </p>
                  <p
                    className={
                      passwordErrors.hasLowercase
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Lowercase letter
                  </p>
                  <p
                    className={
                      passwordErrors.hasLength
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Minimum 6 characters
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isPasswordValid || loading}
                  className="btn bg-[#4d3d30] text-white w-full"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="divider">OR</div>

              {/* Google */}
              <button
                onClick={handleGoogleRegister}
                className="btn w-full border border-[#e8e0d4]"
              >
                <FaGoogle /> Continue with Google
              </button>

              {/* Login */}
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#703B3B] font-semibold">
                  Login
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
