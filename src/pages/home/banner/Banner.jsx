import React from "react";
import Container from "../../../components/shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import { Autoplay, EffectFlip, Navigation, Pagination } from "swiper/modules";
import denim from "../../../assets/denim.png";
import pant from "../../../assets/pant.png";
import tshirt from "../../../assets/tshirt.png";
import "./banner.css";

const Banner = () => {
  return (
    <Container>
      <div className="min-h-[80vh] relative">
        {/* Slogan Slider */}
        <div className="top-swiper">
          {/* Slogan */}
          <Swiper
            reverseDirection={true}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            spaceBetween={30}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <h2 className="flex justify-center font-black text-[13rem]/60 text-primary">
                ESSENTIAL
              </h2>
              <div></div>
            </SwiperSlide>
            <SwiperSlide>
              <h2 className="flex justify-center font-black text-[13rem]/60 text-primary">
                DURABLE
              </h2>
              <div></div>
            </SwiperSlide>
            <SwiperSlide>
              <h2 className="flex justify-center font-black text-[13rem]/60 text-primary">
                CLASSIC
              </h2>
              <div></div>
            </SwiperSlide>
          </Swiper>
          {/* Detail */}
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="flex justify-between items-center mt-30">
                <div className="text-left w-1/3">
                  <h1 className="text-4xl font-bold text-secondary">
                    Premium Denim Jacket
                  </h1>
                  <p className="mt-5">
                    Artisanal denim jackets crafted with heritage techniques and
                    premium organic cotton for timeless style.
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="bg-secondary/20 border-x-5 text-xl p-5 rounded-xl">
                    Handcrafted organic denim with vintage finish. Minimum order
                    50 pieces.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-between items-center mt-30">
                <div className="text-left w-1/3">
                  <h1 className="text-4xl font-bold text-secondary">
                    SmartTech Work Pants
                  </h1>
                  <p className="mt-5">
                    Industrial-grade work pants engineered with stretch
                    technology and intelligent utility features for maximum
                    productivity.
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="bg-secondary/20 border-x-5 text-xl p-5 rounded-xl">
                    Order 100+ pieces for 15% discount. Fast 7-day production.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-between items-center mt-30">
                <div className="text-left w-1/3">
                  <h1 className="text-4xl font-bold text-secondary">
                    EcoCotton Organic T-Shirts
                  </h1>
                  <p className="mt-5">
                    GOTS-certified organic cotton t-shirts produced through
                    zero-waste manufacturing for conscious brands.
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="bg-secondary/20 border-x-5 text-xl p-5 rounded-xl">
                    GOTS certified organic t-shirts starting at $8.99. Minimum 200 pieces.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/*Photo Slider*/}
        <div className="bottom-swiper absolute w-full -bottom-5">
          <Swiper
            effect="flip"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            // allowTouchMove={false}
            modules={[EffectFlip, Pagination, Navigation, Autoplay]}
            flipEffect={{
              slideShadows: false,
            }}
            className="mySwiper h-[80vh]"
          >
            <SwiperSlide>
              <img className="mt-10" src={denim} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={pant} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={tshirt} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
