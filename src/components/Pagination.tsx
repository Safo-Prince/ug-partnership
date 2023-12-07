import { ArrowRight, ArrowLeft } from "iconsax-react";

const Pagination: React.FC = () => {
  return (
    <div className="border border-black px-4 h-8 flex  items-center space-x-2 rounded-md">
      <ArrowLeft size="20" className="text-[#C7C7C7]" />
      <span> 1 of 50</span>
      <ArrowRight size="20" />
    </div>
  );
};

export default Pagination;
