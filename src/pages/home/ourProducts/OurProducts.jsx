import React from "react";
import Container from "../../../components/shared/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import ProductCard from "../../../components/productCard/ProductCard";

const OurProducts = () => {
  return (
    <Container>
      {/* title */}
      <div className="pb-48">
        <SectionTitle title={"Our Signature Collections"}>
          Our Products
        </SectionTitle>
        {/* Cards */}
        <div className="grid grid-cols-4 gap-10 mt-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </Container>
  );
};

export default OurProducts;
