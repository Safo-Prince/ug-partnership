import * as React from "react";

import { ArrowRight, ArrowLeft } from "iconsax-react";

const Pagination: React.FC = () => {
  {
    /* @ts-ignore */
  }
  return (
    <span className="border border-black px-3 py-1.5 flex  max-w-max  items-center space-x-2 rounded-md mt-3 mb-3 ml=">
      {/* @ts-ignore */}
      <ArrowLeft size="20" className="text-[#C7C7C7]" />
      {/* @ts-ignore */}
      <span> 1 of 50</span>
      {/* @ts-ignore */}
      <ArrowRight size="20" />
    </span>
  );
};

export default Pagination;
