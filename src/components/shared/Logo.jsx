import React from "react";
import logo from "../../assets/garment-grid-white.svg";
import logoDark from "../../assets/garment-grid.svg";

const Logo = ({dark=false, size="md"}) => {
  return (
    <a className={`flex items-center gap-1 ${size==="sm" && "sm:text-2xl"} ${size==="md" && "sm:text-4xl"} text-2xl racing-sans  ${dark ? "text-[#4d3d30]" : "text-white"}`}>
      <img className={` ${size === "md" && "sm:w-10"} w-6`} src={dark ? logoDark : logo} alt="" />
      GarmentGrid
    </a>
  );
};

export default Logo;
