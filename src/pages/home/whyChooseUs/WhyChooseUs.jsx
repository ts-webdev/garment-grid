import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import Container from "../../../components/shared/Container";
import garment from "../../../assets/garment/garment-1.jpg"

const WhyChooseUs = () => {
  return (
    <section className="bg-accent my-10 py-10">
      <Container>
        {/* title */}
        <SectionTitle title={"Why Manufacturers Choose GarmentGrid"}>
          Why Choose Us
        </SectionTitle>
        {/* Details Container */}
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-10 ">
          {/* left side container */}
          <div className="bg-white space-y-5 p-5 md:w-2/7  rounded-2xl">
            <div className=" flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
            <div className="border-y border-gray-200 py-3 flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
            <div className=" flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
          </div>
          {/* Image container */}
          <div className=" bg-white   overflow-hidden rounded-2xl">
          <img className="object-fill h-full w-full" src={garment} alt="" />
          </div>
          {/* righ side container */}
          <div className="bg-white space-y-5 p-5 md:w-2/7  rounded-2xl">
            <div className=" flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
            <div className="border-y border-gray-200 py-3 flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
            <div className=" flex gap-5">
              <div>icon</div>

              <div>
                <h3 className="font-bold text-2xl">Artisanal Craft</h3>
                <p className="pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. .
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
