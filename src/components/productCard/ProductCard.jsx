import React from "react";
import shirt from "../../assets/shirt.png";

const ProductCard = () => {
  return (
    <>
      {/* cards go here */}
      <div className="relative border border-secondary group shadow-xl cursor-pointer overflow-hidden text-gray-50 h-72 rounded-2xl hover:duration-700 duration-700">
        <div className="bg-secondary text-gray-800">
          <div className="flex flex-row justify-between">
            <img src={shirt} alt="" />
          </div>
        </div>
        <div className="absolute bg-gray-50 border-t-2 border-primary/30 -bottom-40  p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span className="text-lime-400 font-bold text-xs">T-Shirt</span>
          <span className="text-gray-800 font-bold text-3xl">Premium t-shirt Premium</span>
          <p className="text-neutral-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-secondary">Price: 100/-</p>
          <div className="flex justify-end">
            <button className="btn">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
