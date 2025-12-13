import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  FaStar,
  FaQuoteLeft,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaIndustry,
  FaShoppingBag,
  FaTshirt,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customerFeedback.css";
import SectionTitle from "../../../components/shared/SectionTitle";

// Customer data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Production Manager",
    company: "Urban Fashion Co.",
    rating: 5,
    feedback:
      "GarmentGrid transformed our production workflow. Tracking efficiency improved by 40% and order accuracy reached 99%. The grid visualization is genius!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    industry: "Fashion Retail",
    duration: "6 months user",
    color: "bg-blue-50 border-blue-200",
    icon: <FaTshirt className="text-blue-500" />,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Factory Owner",
    company: "Precision Stitch Ltd.",
    rating: 5,
    feedback:
      "The production tracking system eliminated our communication gaps. Real-time updates helped us reduce delivery delays by 35%. A game-changer for garment manufacturing!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    industry: "Manufacturing",
    duration: "8 months user",
    color: "bg-green-50 border-green-200",
    icon: <FaIndustry className="text-green-500" />,
  },
  {
    id: 3,
    name: "Lisa Wang",
    role: "Operations Director",
    company: "EcoWear Brands",
    rating: 4,
    feedback:
      "Inventory management became seamless. The smart grid helped us optimize fabric usage and reduce waste by 25%. Customer satisfaction scores are at an all-time high.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    industry: "Sustainable Fashion",
    duration: "4 months user",
    color: "bg-teal-50 border-teal-200",
    icon: <FaShoppingBag className="text-teal-500" />,
  },
  {
    id: 4,
    name: "David Park",
    role: "Supply Chain Head",
    company: "Global Apparel Inc.",
    rating: 5,
    feedback:
      "The dashboard analytics helped us identify bottlenecks. Production cycle time reduced from 21 to 14 days. ROI achieved in just 3 months!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    industry: "International Trade",
    duration: "1 year user",
    color: "bg-purple-50 border-purple-200",
    icon: <FaIndustry className="text-purple-500" />,
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Quality Control Manager",
    company: "Heritage Textiles",
    rating: 5,
    feedback:
      "Quality tracking features are exceptional. Defect rates dropped by 60% with better stage monitoring. Our team loves the intuitive interface.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    industry: "Luxury Textiles",
    duration: "9 months user",
    color: "bg-amber-50 border-amber-200",
    icon: <FaTshirt className="text-amber-500" />,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CEO",
    company: "QuickStitch Manufacturing",
    rating: 4,
    feedback:
      "Scaled from 50 to 200 employees seamlessly. The system grew with us. Customer support is responsive and helpful.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    industry: "Fast Fashion",
    duration: "1.5 years user",
    color: "bg-indigo-50 border-indigo-200",
    icon: <FaShoppingBag className="text-indigo-500" />,
  },
];

const CustomerFeedback = () => {
  const swiperRef = useRef(null);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Grid Pattern */}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle title={"Trusted by Industry Leaders"}>
            Customer Feedback
          </SectionTitle>
        </motion.div>

        {/* Main Swiper Slider */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => {
                return `<span class="${className} bg-primary"></span>`;
              },
            }}
            loop={true}
            className="pb-12!"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`${testimonial.color} rounded-2xl border p-6 md:p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6">
                    <FaQuoteLeft className="w-8 h-8 text-gray-300" />
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Feedback Text */}
                  <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                    "{testimonial.feedback}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">
                        {testimonial.icon}
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.company}
                      </p>

                      {/* Industry Tag */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block px-3 py-1 bg-white text-xs font-medium rounded-full shadow-sm">
                          {testimonial.industry}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {testimonial.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-linear-to-r from-primary/10 to-blue-50 rounded-2xl p-8 border border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  98%
                </div>
                <div className="text-gray-600 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  40%
                </div>
                <div className="text-gray-600 text-sm">
                  Production Efficiency Increase
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  200+
                </div>
                <div className="text-gray-600 text-sm">
                  Manufacturing Partners
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  4.9/5
                </div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn btn-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Join Our Success Stories
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Over 500 garment manufacturers trust GarmentGrid for their
            production tracking
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
