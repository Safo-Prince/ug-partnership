import React from "react";

import "../styles/hero.css";

const Hero: React.FC = () => {
  return (
    <>
      <div className=" hero-image bg-no-repeat bg-cover  w-full h-80 flex items-center justify-center mt-10">
        <h1 className="font-semibold text-6xl font-poppins  text-white">
          UG Online Technologies Portal
        </h1>
      </div>
    </>
  );
};

export default Hero;
