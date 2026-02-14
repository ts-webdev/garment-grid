import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaUser, 
  FaComment, 
  FaPaperPlane,
  FaHeadset,
  FaQuestionCircle,
  FaFileAlt,
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";
import Container from "../../components/shared/Container";
import Logo from "../../components/shared/Logo";
import SectionTitle from "../../components/shared/SectionTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contact form functionality will be added later
    console.log("Contact form submitted", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      details: ["123 Garment Street", "Fashion District, Dhaka - 1205", "Bangladesh"],
      bg: "bg-[#4d3d30]/5",
      color: "text-[#4d3d30]"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      details: ["+880 1234 567890", "+880 9876 543210"],
      info: "Mon-Fri, 9:00 AM - 6:00 PM",
      bg: "bg-[#703B3B]/5",
      color: "text-[#703B3B]"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      details: ["contact@garmentgrid.com", "support@garmentgrid.com"],
      info: "24/7 Support Available",
      bg: "bg-[#4d3d30]/5",
      color: "text-[#4d3d30]"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Business Hours",
      details: ["Saturday - Thursday", "9:00 AM - 6:00 PM"],
      info: "GMT+6 (Bangladesh Time)",
      bg: "bg-[#703B3B]/5",
      color: "text-[#703B3B]"
    }
  ];

  const faqs = [
    {
      question: "How do I start using GarmentGrid?",
      answer: "Simply create a free account and you'll get instant access to our platform. No credit card required for the 14-day trial."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 email support, live chat during business hours, and dedicated account managers for enterprise clients."
    },
    {
      question: "Can I integrate GarmentGrid with my existing systems?",
      answer: "Yes, we offer API integration and can work with your existing ERP, inventory, or accounting software."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level 256-bit encryption and are GDPR compliant. Your data is backed up daily."
    }
  ];

  const supportOptions = [
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 Customer Support",
      description: "Get help anytime from our dedicated support team",
      action: "Live Chat",
      link: "#"
    },
    {
      icon: <FaQuestionCircle className="text-3xl" />,
      title: "Help Center",
      description: "Find answers to common questions in our knowledge base",
      action: "Browse FAQs",
      link: "#"
    },
    {
      icon: <FaFileAlt className="text-3xl" />,
      title: "Documentation",
      description: "Detailed guides and API documentation",
      action: "Read Docs",
      link: "#"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Sales Inquiry",
      description: "Interested in enterprise plans? Talk to our sales team",
      action: "Contact Sales",
      link: "#"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4d3d30] to-[#703B3B] text-white py-24 overflow-hidden mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 racing-sans">
                Get in <span className="text-[#e8e0d4]">Touch</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Have questions about GarmentGrid? Our team is here to help. 
                Reach out to us anytime — we'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white relative -mt-16 z-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-[#e8e0d4] hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${info.bg} flex items-center justify-center ${info.color} mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-[#4d3d30] mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-gray-600">{detail}</p>
                ))}
                {info.info && (
                  <p className="text-xs text-[#703B3B] mt-2 font-medium">{info.info}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Map & Form Section */}
      <section className="py-20 bg-[#e8e0d4]/20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle title="Visit Our Headquarters">
                Our Location
              </SectionTitle>
              
              <div className="mt-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e8e0d4]">
                  {/* Map Placeholder */}
                  <div className="h-80 bg-gradient-to-br from-[#4d3d30]/10 to-[#703B3B]/10 relative">
                    {/* Decorative Map Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 800 400">
                        <circle cx="200" cy="100" r="40" fill="#4d3d30" />
                        <circle cx="600" cy="150" r="30" fill="#703B3B" />
                        <circle cx="350" cy="250" r="50" fill="#4d3d30" />
                        <circle cx="500" cy="80" r="25" fill="#703B3B" />
                        <path d="M200 100 L350 250 L500 80 L600 150" stroke="#4d3d30" strokeWidth="2" strokeDasharray="8 8" />
                      </svg>
                    </div>
                    
                    {/* Center Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="w-16 h-16 bg-[#703B3B] rounded-full flex items-center justify-center animate-pulse shadow-xl">
                        <FaMapMarkerAlt className="text-white text-2xl" />
                      </div>
                      <p className="font-bold text-[#4d3d30] mt-2 bg-white px-4 py-1 rounded-full shadow-md">
                        GarmentGrid HQ
                      </p>
                    </div>
                  </div>
                  
                  {/* Address Details */}
                  <div className="p-6">
                    <h4 className="font-bold text-[#4d3d30] mb-3 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#703B3B]" />
                      Head Office
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      123 Garment Street, Fashion District,<br />
                      Dhaka - 1205, Bangladesh
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-[#4d3d30] hover:bg-[#703B3B] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        Get Directions
                        <FaArrowRight className="text-xs" />
                      </button>
                      <button className="border border-[#e8e0d4] hover:border-[#703B3B] text-gray-600 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                        View Larger Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle title="Send Us a Message">
                Let's Talk
              </SectionTitle>
              
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-[#e8e0d4]">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#4d3d30] mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#703B3B] hover:bg-[#4d3d30] text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
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
                        Email Address *
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

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                          placeholder="+880 1234 567890"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaComment className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="block w-full px-3 py-3 border border-[#e8e0d4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#703B3B] focus:border-transparent transition-all bg-white/50 resize-none"
                        placeholder="Tell us about your requirements, questions, or feedback..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#4d3d30] to-[#703B3B] hover:from-[#703B3B] hover:to-[#4d3d30] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      * Required fields. We'll respond within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTitle title="How Can We Help?">
              Support Options
            </SectionTitle>
            <p className="text-gray-600 mt-6">
              Choose the best way to get the support you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-[#e8e0d4] hover:border-[#703B3B]/30 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#e8e0d4]/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#703B3B]/10 transition-colors">
                  <div className="text-[#703B3B] group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#4d3d30] mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                <a 
                  href={option.link}
                  className="text-[#703B3B] hover:text-[#4d3d30] font-medium text-sm flex items-center justify-center gap-1 group"
                >
                  {option.action}
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#e8e0d4]/20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTitle title="Quick Answers">
              Frequently Asked Questions
            </SectionTitle>
            <p className="text-gray-600 mt-6">
              Find instant answers to common questions about GarmentGrid
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-[#e8e0d4] hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-[#4d3d30] mb-2 flex items-start gap-2">
                    <span className="text-[#703B3B] text-lg">Q:</span>
                    <span className="text-sm">{faq.question}</span>
                  </h3>
                  <p className="text-sm text-gray-600 ml-5">
                    <span className="font-medium text-[#703B3B]">A:</span> {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-600">
                Still have questions? 
                <Link to="/faq" className="text-[#703B3B] font-semibold hover:text-[#4d3d30] ml-1 underline underline-offset-2">
                  Visit our full FAQ page
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Connect With Us */}
      <section className="py-16 bg-white">
        <Container>
          <div className="bg-gradient-to-r from-[#4d3d30]/5 via-[#703B3B]/5 to-[#4d3d30]/5 rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#4d3d30] mb-3 racing-sans">
                  Connect With Us
                </h3>
                <p className="text-gray-600 max-w-md">
                  Follow us on social media for updates, industry news, and success stories from our manufacturing partners.
                </p>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#4d3d30]/10 hover:bg-[#4d3d30] flex items-center justify-center text-[#4d3d30] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#703B3B]/10 hover:bg-[#703B3B] flex items-center justify-center text-[#703B3B] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#4d3d30]/10 hover:bg-[#4d3d30] flex items-center justify-center text-[#4d3d30] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-[#703B3B]/10 hover:bg-[#703B3B] flex items-center justify-center text-[#703B3B] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 racing-sans">
                Ready to Streamline Your Production?
              </h2>
              <p className="text-white/90 mb-8">
                Join 500+ manufacturers who are already using GarmentGrid to manage their orders and production.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/register" 
                  className="bg-[#e8e0d4] text-[#4d3d30] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2 group"
                >
                  Start Free Trial
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/all-products" 
                  className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Products
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;