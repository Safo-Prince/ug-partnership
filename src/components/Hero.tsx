import * as React from 'react';

import "../styles/hero.css";

const Hero: React.FC = () => {
  return (
    <>
      <div className=" hero-image bg-no-repeat bg-cover    w-full sm:h-80  h-32 flex items-center justify-center ">
        <h1 className=" font-medium sm:font-semibold  text-xl sm:text-2xl lg:text-6xl font-poppins  text-white">
          UG Online Technologies Portal
        </h1>
      </div>
    </>
  );
};

export default Hero;
