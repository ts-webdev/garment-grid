import React from "react";
import Container from "../../../components/shared/Container";
import Logo from "../../../components/shared/Logo";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full filter blur-3xl"></div>
      </div>

      <Container>
        {/* Ready for Project Banner - Enhanced */}
        <div className="relative bg-linear-to-r from-primary to-accent p-8 lg:p-10 rounded-2xl mb-16 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
          <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="lg:flex w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Ready to Transform Your Production?
                </h2>
                <p className="text-white/80 text-sm lg:text-base mt-1">
                  Join 500+ manufacturers who trust GarmentGrid
                </p>
              </div>
            </div>
            <button className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              Contact Sales Team
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Company Info - Logo & Description */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
              <Logo className="text-white" />
              <p className="text-sm leading-relaxed mt-4 text-gray-400">
                GarmentGrid is the leading production tracking platform for
                garment manufacturers. We help factories digitize their
                workflow, reduce errors, and deliver on time, every time.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent border-2 border-gray-900"
                  ></div>
                ))}
              </div>
              <p className="text-sm">
                <span className="font-bold text-white">500+</span>
                <span className="text-gray-400"> manufacturers trust us</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "All Products", path: "/all-products" },
                { name: "How It Works", path: "/#how-it-works" },
                { name: "Contact", path: "/contact" },
                { name: "Careers", path: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-accent group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Help */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "FAQs",
                "Shipping & Returns",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-accent group-hover:w-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Get in Touch
            </h3>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 shrink-0" />
                <p className="text-sm text-gray-300">
                  123 Garment Street, Fashion District,
                  <br />
                  Dhaka - 1205, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-accent shrink-0" />
                <p className="text-sm text-gray-300">+880 1234 567890</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent shrink-0" />
                <p className="text-sm text-gray-300">contact@garmentgrid.com</p>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-accent shrink-0" />
                <p className="text-sm text-gray-300">
                  Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Social Links */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center lg:text-left">
              <p>© {currentYear} GarmentGrid. All rights reserved.</p>
              <p className="mt-1 text-xs">
                Designed & Developed with ❤️ for Garment Industry
              </p>
            </div>

            {/* Social Links - Updated with X logo and modern design */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden lg:block">
                Follow us:
              </span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="X (Twitter)"
                >
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                  Visa
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                  Master
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                  BKash
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                  Nagad
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup - Optional */}
        <div className="mt-8 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              📧 Subscribe to get updates about new collections and offers
            </p>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full sm:w-64"
              />
              <button className="px-4 py-2 bg-accent text-white rounded-r-lg hover:bg-accent/80 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
