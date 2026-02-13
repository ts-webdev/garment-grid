import React from "react";
import Navbar from "../../shared/navbar/Navbar";
import Banner from "../banner/Banner";
import OurProducts from "../ourProducts/OurProducts";
import Footer from "../../shared/footer/Footer";
import CustomerFeedback from "../customerFeedback/CustomerFeedback";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";
import HowItWorks from "../howItWorks/HowItWorks";
import ProductionStats from "../productionStats/ProductionStats";
import Sustainability from "../sustainability/Sustainability";

const Home = () => {
  return (
    <>
      <header className="bg-accent py-5 relative">
        <div
          className="absolute inset-0 opacity-8 z-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
        <Banner />
      </header>
      <main>
        <OurProducts />
        <ProductionStats />
        <HowItWorks />
        <WhyChooseUs />
        <CustomerFeedback />
        <Sustainability />
      </main>
    </>
  );
};

export default Home;
