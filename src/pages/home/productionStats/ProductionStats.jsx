import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaChartLine, FaCheckCircle, FaClock, FaBoxOpen, FaUsers, FaTshirt } from 'react-icons/fa';
import { GiSewingMachine, GiCutDiamond, GiRolledCloth } from 'react-icons/gi';
import SectionTitle from '../../../components/shared/SectionTitle';

const ProductionStats = () => {
  const stats = [
    {
      icon: <GiSewingMachine className="text-[#4d3d30]" />,
      value: 15420,
      label: 'Orders Completed',
      suffix: '+',
      bg: 'bg-[#4d3d30]/10',
      border: 'border-[#4d3d30]/20'
    },
    {
      icon: <FaClock className="text-[#703B3B]" />,
      value: 68,
      label: 'In Production',
      suffix: '',
      bg: 'bg-[#703B3B]/10',
      border: 'border-[#703B3B]/20'
    },
    {
      icon: <FaCheckCircle className="text-[#4d3d30]" />,
      value: 99.7,
      label: 'On-Time Delivery',
      suffix: '%',
      bg: 'bg-[#4d3d30]/10',
      border: 'border-[#4d3d30]/20'
    },
    {
      icon: <GiCutDiamond className="text-[#703B3B]" />,
      value: 235,
      label: 'Active Manufacturers',
      suffix: '+',
      bg: 'bg-[#703B3B]/10',
      border: 'border-[#703B3B]/20'
    }
  ];

  const productionStages = [
    { stage: 'Cutting', progress: 85, factory: 'Northern Mills', time: '09:30 AM', icon: <GiCutDiamond /> },
    { stage: 'Sewing', progress: 62, factory: 'Eastern Garments', time: '11:15 AM', icon: <GiSewingMachine /> },
    { stage: 'Finishing', progress: 40, factory: 'Western Textiles', time: '02:45 PM', icon: <GiRolledCloth /> }
  ];

  return (
    <section className="py-20 bg-[#e8e0d4]/30 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4d3d30] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#703B3B] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <SectionTitle title="Real-Time Production Insights">
          Production Statistics
        </SectionTitle>

        {/* Live Tracker Badge */}
        <div className="flex justify-center mb-8 mt-7">
          <div className="inline-flex items-center gap-2 bg-[#703B3B]/10 px-4 py-2 rounded-full border border-[#703B3B]/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#703B3B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#703B3B]"></span>
            </span>
            <span className="text-sm font-medium text-[#703B3B]">LIVE - Updating every 30 seconds</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className={`${stat.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${stat.border} backdrop-blur-sm`}>
                <div className="relative">
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm border ${stat.border}`}>
                    {stat.icon}
                  </div>
                  
                  {/* Value */}
                  <div className="text-3xl lg:text-4xl font-bold text-[#4d3d30] mb-1">
                    <CountUp end={stat.value} duration={3} separator="," />
                    {stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  
                  {/* Mini Progress Bar */}
                  <div className="mt-4 w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className={`h-full rounded-full ${index % 2 === 0 ? 'bg-[#4d3d30]' : 'bg-[#703B3B]'}`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Production Timeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-[#e8e0d4] overflow-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#4d3d30] flex items-center gap-2">
              <FaClock className="text-[#703B3B]" />
              Today's Production Timeline
            </h3>
            <button className="text-sm text-[#703B3B] hover:underline font-medium">
              View Full Report →
            </button>
          </div>
          
          <div className="space-y-4">
            {productionStages.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#e8e0d4] flex items-center justify-center text-[#4d3d30]">
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-gray-500 w-16">{item.time}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#4d3d30]">{item.stage}</span>
                    <span className="text-xs text-gray-500">{item.factory}</span>
                  </div>
                  <div className="w-full bg-[#e8e0d4] rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="bg-gradient-to-r from-[#4d3d30] to-[#703B3B] h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#4d3d30]">{item.progress}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductionStats;