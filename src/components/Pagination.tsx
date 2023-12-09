import { ArrowRight, ArrowLeft } from "iconsax-react";

const Pagination: React.FC = () => {
  return (
    <span className="border border-black px-3 py-1.5 flex  max-w-max  items-center space-x-2 rounded-md mt-3 mb-3 ml=">
      <ArrowLeft size="20" className="text-[#C7C7C7]" />
      <span> 1 of 50</span>
      <ArrowRight size="20" />
    </span>
  );
};

export default Pagination;
