import React from "react";
import logo from "../../assets/garment-grid-white.svg";
import logoDark from "../../assets/garment-grid.svg";

const Logo = ({dark=false}) => {
  return (
    <a className={`flex items-center gap-1 sm:text-4xl text-2xl racing-sans  ${dark ? "text-[#4d3d30]" : "text-white"}`}>
      <img className="sm:w-10 w-7" src={dark ? logoDark : logo} alt="" />
      GarmentGrid
    </a>
  );
};

export default Logo;
