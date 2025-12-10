import React from "react";

const SectionTitle = ({ children, title }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-2 text-secondary">
        <div className="border w-7 h-0"></div>
        <h2 className="text-2xl font-semibold">{children}</h2>
        <div className="border w-7 h-0"></div>
      </div>
      <h1 className="text-3xl text-center mt-3 font-bold">{title}</h1>
    </div>
  );
};

export default SectionTitle;
