import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../../components/shared/SectionTitle";
import { FaLeaf, FaWater, FaSolarPanel, FaRecycle } from "react-icons/fa";

const Sustainability = () => {
  const initiatives = [
    {
      icon: <FaLeaf className="text-3xl text-[#4d3d30]" />,
      title: "Organic Cotton",
      description:
        "100% certified organic cotton, free from pesticides and harmful chemicals.",
      stats: "65% less water",
    },
    {
      icon: <FaWater className="text-3xl text-[#703B3B]" />,
      title: "Water Conservation",
      description:
        "Closed-loop water recycling system saving millions of liters annually.",
      stats: "40% reduction",
    },
    {
      icon: <FaSolarPanel className="text-3xl text-[#4d3d30]" />,
      title: "Solar Powered",
      description:
        "Our factories run on 60% renewable solar energy during peak hours.",
      stats: "2.5M kWh/year",
    },
    {
      icon: <FaRecycle className="text-3xl text-[#703B3B]" />,
      title: "Zero Waste",
      description:
        "Fabric scraps recycled into new yarns and packaging materials.",
      stats: "95% recycled",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-b from-white to-[#e8e0d4]/20">
      <div className="container mx-auto px-4">
        {/* Section Title - Using your component */}
        <SectionTitle title="Sustainability First">
          Ethical Manufacturing
        </SectionTitle>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mt-6 mb-12"
        >
          Committed to sustainable practices and ethical manufacturing since
          2015. Every garment tells a story of responsibility.
        </motion.p>

        {/* Stats Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4d3d30]/5 px-5 py-2.5 rounded-full border border-[#e8e0d4]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4d3d30] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4d3d30]"></span>
            </span>
            <span className="text-sm font-medium text-[#4d3d30]">
              Certified B Corp • Carbon Neutral • Fair Trade
            </span>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e8e0d4] hover:border-[#4d3d30]/30 h-full flex flex-col">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-xl bg-[#e8e0d4]/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#4d3d30] mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {item.description}
                </p>

                {/* Stat Badge */}
                <div className="inline-block self-start bg-[#703B3B]/5 px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-[#703B3B]">
                    {item.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-[#e8e0d4]"
        >
          {[
            { name: "GOTS Certified", icon: "🌱" },
            { name: "OEKO-TEX®", icon: "✓" },
            { name: "Fair Trade", icon: "🤝" },
            { name: "Carbon Neutral", icon: "🌍" },
            { name: "BCorp", icon: "B" },
          ].map((cert, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-500">
              <span className="text-[#4d3d30] font-bold">{cert.icon}</span>
              <span className="text-xs sm:text-sm">{cert.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Simple CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-[#4d3d30] hover:text-[#703B3B] transition-colors font-medium text-sm group">
            Read Our Sustainability Report 2025
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
