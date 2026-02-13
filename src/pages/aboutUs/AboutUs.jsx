import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaUsers, 
  FaIndustry, 
  FaGlobeAsia, 
  FaChartLine, 
  FaAward, 
  FaHandshake,
  FaQuoteRight,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import { GiSewingMachine, GiCutDiamond, GiRolledCloth, GiClothes } from "react-icons/gi";
import Container from "../../components/shared/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import Logo from "../../components/shared/Logo";

const AboutUs = () => {
  const stats = [
    { icon: <FaIndustry />, value: "500+", label: "Manufacturers" },
    { icon: <FaGlobeAsia />, value: "15+", label: "Countries" },
    { icon: <FaUsers />, value: "28.5K", label: "Workers" },
    { icon: <FaChartLine />, value: "1.2M", label: "Orders Completed" }
  ];

  const milestones = [
    { year: "2018", title: "The Beginning", description: "GarmentGrid founded in Dhaka, Bangladesh with a vision to digitize garment manufacturing." },
    { year: "2019", title: "First 100 Factories", description: "Reached 100 manufacturing partners across South Asia." },
    { year: "2020", title: "Global Expansion", description: "Expanded to Vietnam, India, and China. Launched real-time tracking feature." },
    { year: "2022", title: "1 Million Orders", description: "Crossed 1 million orders tracked on our platform." },
    { year: "2023", title: "Sustainability Initiative", description: "Launched eco-friendly manufacturing certification program." },
    { year: "2025", title: "Today", description: "Trusted by 500+ factories in 15 countries, tracking 50,000+ orders monthly." }
  ];

  const values = [
    {
      icon: <FaHandshake className="text-3xl text-[#703B3B]" />,
      title: "Trust & Transparency",
      description: "We believe in complete transparency between buyers and manufacturers. Every step of production is visible and verifiable."
    },
    {
      icon: <GiSewingMachine className="text-3xl text-[#4d3d30]" />,
      title: "Quality First",
      description: "We never compromise on quality. Our platform ensures that every garment meets the highest standards of craftsmanship."
    },
    {
      icon: <FaGlobeAsia className="text-3xl text-[#703B3B]" />,
      title: "Global Community",
      description: "We're building a global network of ethical manufacturers and conscious buyers, connected through technology."
    },
    {
      icon: <FaAward className="text-3xl text-[#4d3d30]" />,
      title: "Innovation",
      description: "We continuously evolve our platform with cutting-edge technology to solve real industry challenges."
    }
  ];

  const team = [
    {
      name: "Rafiq Ahmed",
      position: "Founder & CEO",
      bio: "20+ years in garment manufacturing, ex-Levi's production head",
      image: "👨‍💼",
      bg: "bg-[#4d3d30]/5"
    },
    {
      name: "Tahmina Rahman",
      position: "CTO",
      bio: "Former Tech Lead at Walmart Labs, supply chain expert",
      image: "👩‍💻",
      bg: "bg-[#703B3B]/5"
    },
    {
      name: "Shahid Khan",
      position: "Head of Operations",
      bio: "15 years in factory management, Lean Six Sigma Black Belt",
      image: "👨‍🔧",
      bg: "bg-[#4d3d30]/5"
    },
    {
      name: "Nusrat Jahan",
      position: "Customer Success",
      bio: "Ex-portfolio manager, passionate about sustainable fashion",
      image: "👩‍💼",
      bg: "bg-[#703B3B]/5"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4d3d30] to-[#703B3B] text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8e0d4] rounded-full filter blur-3xl"></div>
        </div>
        
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Logo className="text-white text-4xl mb-6 inline-block" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 racing-sans">
                Powering the Future of <br />
                <span className="text-[#e8e0d4]">Garment Manufacturing</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                We're on a mission to digitize the global garment industry, 
                making production tracking simple, transparent, and efficient.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link 
                  to="/contact" 
                  className="bg-[#e8e0d4] text-[#4d3d30] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2 group"
                >
                  Get in Touch
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-[#e8e0d4]/20 to-white border border-[#e8e0d4]"
              >
                <div className="text-3xl text-[#703B3B] mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#4d3d30] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#e8e0d4]/20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle title="Our Story">
                Who We Are
              </SectionTitle>
              
              <div className="mt-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Founded in <span className="font-bold text-[#703B3B]">2018</span>, GarmentGrid started with a simple observation: 
                  garment factories were still using paper and spreadsheets to manage million-dollar orders.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our founder, Rafiq Ahmed, spent 20 years in production floors across Asia. He saw 
                  firsthand how delayed communication, lost documents, and lack of real-time visibility 
                  cost manufacturers millions and strained buyer relationships.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, GarmentGrid powers <span className="font-bold text-[#4d3d30]">500+ factories</span> across 15 countries, 
                  tracking over 50,000 orders monthly. But our mission remains the same: 
                  <span className="italic"> make garment manufacturing transparent, efficient, and sustainable.</span>
                </p>
                
                <div className="bg-white p-6 rounded-xl border-l-4 border-[#703B3B] shadow-sm mt-6">
                  <div className="flex gap-4">
                    <div className="text-3xl text-[#703B3B]">
                      <FaQuoteRight />
                    </div>
                    <div>
                      <p className="text-gray-600 italic">
                        "We're not just building software. We're building trust between the people who make clothes 
                        and the people who wear them."
                      </p>
                      <p className="text-sm font-semibold text-[#4d3d30] mt-2">
                        — Rafiq Ahmed, Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-[#4d3d30]/10 p-6 rounded-2xl h-40 flex flex-col justify-center">
                    <GiSewingMachine className="text-4xl text-[#4d3d30] mb-2" />
                    <p className="font-semibold text-[#4d3d30]">Cutting</p>
                    <p className="text-xs text-gray-600">Digitized patterns</p>
                  </div>
                  <div className="bg-[#703B3B]/10 p-6 rounded-2xl h-40 flex flex-col justify-center">
                    <GiRolledCloth className="text-4xl text-[#703B3B] mb-2" />
                    <p className="font-semibold text-[#703B3B]">Finishing</p>
                    <p className="text-xs text-gray-600">QC checkpoints</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-[#703B3B]/10 p-6 rounded-2xl h-40 flex flex-col justify-center">
                    <GiCutDiamond className="text-4xl text-[#703B3B] mb-2" />
                    <p className="font-semibold text-[#703B3B]">Sewing</p>
                    <p className="text-xs text-gray-600">Line tracking</p>
                  </div>
                  <div className="bg-[#4d3d30]/10 p-6 rounded-2xl h-40 flex flex-col justify-center">
                    <GiClothes className="text-4xl text-[#4d3d30] mb-2" />
                    <p className="font-semibold text-[#4d3d30]">Packing</p>
                    <p className="text-xs text-gray-600">Shipment ready</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 -top-6 -right-6 w-64 h-64 bg-[#e8e0d4] rounded-full blur-3xl opacity-50"></div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTitle title="What Drives Us">
              Our Core Values
            </SectionTitle>
            <p className="text-gray-600 mt-6">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-[#e8e0d4] hover:border-[#703B3B]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#e8e0d4]/50 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-[#4d3d30] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-[#e8e0d4]/20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionTitle title="Our Journey">
              Milestones
            </SectionTitle>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#4d3d30] via-[#703B3B] to-[#4d3d30] hidden lg:block"></div>
            
            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } mb-8 lg:mb-0 lg:h-40`}
                >
                  {/* Year Badge */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-block bg-white px-6 py-3 rounded-full shadow-md border border-[#e8e0d4] ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}>
                      <span className="text-xl font-bold text-[#703B3B]">{milestone.year}</span>
                    </div>
                  </div>
                  
                  {/* Timeline Dot (Desktop) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#703B3B] rounded-full border-4 border-white hidden lg:block"></div>
                  
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8e0d4] hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-[#4d3d30] mb-2">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTitle title="Leadership">
              Meet The Team
            </SectionTitle>
            <p className="text-gray-600 mt-6">
              Industry veterans and technology experts working together to transform garment manufacturing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl border border-[#e8e0d4] hover:border-[#703B3B]/30 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`${member.bg} p-6 flex justify-center`}>
                  <span className="text-6xl">{member.image}</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-[#4d3d30] mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-[#703B3B] mb-3">{member.position}</p>
                  <p className="text-xs text-gray-500">{member.bio}</p>
                  
                  <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-[#e8e0d4] flex items-center justify-center text-[#4d3d30] hover:bg-[#703B3B] hover:text-white transition-colors cursor-pointer">in</span>
                    <span className="w-8 h-8 rounded-full bg-[#e8e0d4] flex items-center justify-center text-[#4d3d30] hover:bg-[#703B3B] hover:text-white transition-colors cursor-pointer">✉</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners & Certifications */}
      <section className="py-16 bg-[#e8e0d4]/20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <SectionTitle title="Trusted By">
              Our Partners
            </SectionTitle>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {["ZARA", "H&M", "UNIQLO", "LEVI'S", "ADIDAS", "NIKE", "PUMA", "GAP"].map((brand, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <span className="text-xl lg:text-2xl font-bold text-gray-400 hover:text-[#4d3d30]">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {["GOTS Certified", "OEKO-TEX®", "Fair Trade", "Carbon Neutral", "BCorp"].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#e8e0d4]">
                <FaCheckCircle className="text-[#703B3B] text-sm" />
                <span className="text-xs text-gray-600">{cert}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4d3d30] to-[#703B3B] text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 racing-sans">
                Ready to Transform Your Production?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join 500+ manufacturers who are already using GarmentGrid to streamline their workflow.
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
                  to="/contact" 
                  className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </div>
              <p className="text-sm text-white/70 mt-6">
                ✦ No credit card required ✦ Free 14-day trial ✦
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;