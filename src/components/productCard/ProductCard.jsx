import React from "react";
import shirt from "../../assets/shirt.png";

const ProductCard = () => {
  return (
    <>
      {/* cards go here */}
      <div className="relative border border-secondary group shadow-2xl cursor-pointer overflow-hidden text-gray-50 h-72 rounded-2xl hover:duration-700 duration-700">
        <div className="bg-secondary text-gray-800">
          <div className="flex flex-row justify-between">
            <img src={shirt} alt="" />
          </div>
        </div>
        <div className="absolute bg-gray-50 -bottom-24  p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span className="text-lime-400 font-bold text-xs">TAILWIND</span>
          <span className="text-gray-800 font-bold text-3xl">Cheat Sheet</span>
          <p className="text-neutral-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
