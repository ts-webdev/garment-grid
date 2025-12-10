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
          <div className="hidden md:block">
            <Swiper
              reversedirection="true"
              allowTouchMove={false}
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
                <h2 className="flex justify-center font-black 2xl:text-[12rem]/60 xl:text-[11rem]/60 lg:text-[10rem]/60 md:text-[8rem]/60 text-primary">
                  ESSENTIAL
                </h2>
                <div></div>
              </SwiperSlide>
              <SwiperSlide>
                <h2 className="flex justify-center font-black 2xl:text-[12rem]/60 xl:text-[11rem]/60 lg:text-[10rem]/60 md:text-[8rem]/60 text-primary">
                  DURABLE
                </h2>
                <div></div>
              </SwiperSlide>
              <SwiperSlide>
                <h2 className="flex justify-center font-black 2xl:text-[12rem]/60 xl:text-[11rem]/60 lg:text-[10rem]/60 md:text-[8rem]/60 text-primary">
                  CLASSIC
                </h2>
                <div></div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Detail */}
          <Swiper
            slidesPerView={1}
            allowTouchMove={false}
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
              <div className="flex flex-col md:flex-row md:justify-between items-center lg:mt-30 mt-10 md:mt-0">
                <div className="md:text-left text-center md:w-1/3">
                  <h1 className="lg:text-4xl md:text-3xl text-4xl font-bold text-secondary">
                    Premium Denim Jacket
                  </h1>
                  <p className="mt-5 lg:text-md md:text-sm text-primary/80">
                    Artisanal denim jackets crafted with heritage techniques and
                    premium organic cotton for timeless style.
                  </p>
                </div>
                <div className="md:w-1/3 hidden md:block">
                  <p className="bg-secondary/20 border-x-5 lg:text-xl text-sm p-5 rounded-xl">
                    Handcrafted organic denim with vintage finish. Minimum order
                    50 pieces.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline btn-sm lg:btn-md">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary btn-sm lg:btn-md">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row md:justify-between items-center lg:mt-30 mt-10 md:mt-0">
                <div className="md:text-left text-center md:w-1/3">
                  <h1 className="lg:text-4xl md:text-3xl text-4xl font-bold text-secondary">
                    Premium Denim Jacket
                  </h1>
                  <p className="mt-5 lg:text-md md:text-sm text-primary/80">
                    Artisanal denim jackets crafted with heritage techniques and
                    premium organic cotton for timeless style.
                  </p>
                </div>
                <div className="md:w-1/3 hidden md:block">
                  <p className="bg-secondary/20 border-x-5 lg:text-xl text-sm p-5 rounded-xl">
                    Handcrafted organic denim with vintage finish. Minimum order
                    50 pieces.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline btn-sm lg:btn-md">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary btn-sm lg:btn-md">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row md:justify-between items-center lg:mt-30 mt-10 md:mt-0">
                <div className="md:text-left text-center md:w-1/3">
                  <h1 className="lg:text-4xl md:text-3xl text-4xl font-bold text-secondary">
                    Premium Denim Jacket
                  </h1>
                  <p className="mt-5 lg:text-md md:text-sm text-primary/80">
                    Artisanal denim jackets crafted with heritage techniques and
                    premium organic cotton for timeless style.
                  </p>
                </div>
                <div className="md:w-1/3 hidden md:block">
                  <p className="bg-secondary/20 border-x-5 lg:text-xl text-sm p-5 rounded-xl">
                    Handcrafted organic denim with vintage finish. Minimum order
                    50 pieces.
                  </p>
                  <button className="btn mt-5 mx-2 hover:btn-primary btn-outline btn-sm lg:btn-md">
                    Order Now
                  </button>
                  <button className="btn mt-5 mx-2  btn-primary btn-sm lg:btn-md">
                    Show All Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/*Photo Slider*/}
        <div className="bottom-swiper absolute w-full top-0 left-0 flex justify-center items-center">
          <Swiper
            effect="flip"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            allowTouchMove={false}
            modules={[EffectFlip, Pagination, Navigation, Autoplay]}
            flipEffect={{
              slideShadows: false,
            }}
            className="mySwiper h-[80vh]"
          >
            <SwiperSlide>
              <img className="mt-10 p-5" src={denim} />
              <div className="flex md:hidden justify-center">
                <button className="btn mt-5 mx-2 hover:btn-primary btn-outline ">
                  Order Now
                </button>
                <button className="btn mt-5 mx-2  btn-primary ">
                  Show All Product
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="" src={pant} />
              <div className="flex md:hidden justify-center">
                <button className="btn mt-5 mx-2 hover:btn-primary btn-outline ">
                  Order Now
                </button>
                <button className="btn mt-5 mx-2  btn-primary ">
                  Show All Product
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="" src={tshirt} />
              <div className="flex md:hidden justify-center">
                <button className="btn mt-5 mx-2 hover:btn-primary btn-outline ">
                  Order Now
                </button>
                <button className="btn mt-5 mx-2  btn-primary ">
                  Show All Product
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
