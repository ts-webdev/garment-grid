import React, { useEffect, useState } from "react";
import Container from "../../../components/shared/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import AnimationContainer from "../../../components/shared/AnimationContainer";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import ProductCard from "../../../components/shared/ProductCard";

const OurProducts = () => {
  const { getData } = useAxios();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getData("/products");

        // ⚠️ depending on your backend response shape
        setProducts(res?.data || res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [getData]);

  // ✅ loading state
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <span className="loading loading-spinner loading-lg text-[#703B3B]"></span>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <SectionTitle title={"Our Signature Collections"}>
          Our Products
        </SectionTitle>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
          {products
            ?.slice(0, 8) // ✅ only first 8 products
            .map((product, index) => (
            <ProductCard product={product} index={index}/>
            ))}
        </div>
        <div className="flex justify-center mt-12">
          <AnimationContainer variant="fade-up" delay={0.2}>
            <Link
              to="/all-products"
              className="group inline-flex items-center gap-2 bg-[#4d3d30] hover:bg-[#703B3B] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Show All Products
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </AnimationContainer>
        </div>
      </div>
    </Container>
  );
};

export default OurProducts;
