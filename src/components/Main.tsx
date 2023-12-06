import { useState } from "react";
import deloitte from "../assets/deloitte.png";
import tullow from "../assets/tullow-oil.png";
import german from "../assets/german.png";
import masterCard from "../assets/mastercard.png";
import africanPrint from "../assets/african-print.png";
import GNPC from "../assets/gnpc.png";
import Modal from "./Modal";

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-[1300px] mt-12 ">
      <h1 className="font-bold text-7xl font-poppins ">
        Industry-Academia Synergy: Driving The University’s Progress
      </h1>

      <div className="flex justify-between mt-14">
        <div className="border border-red-400  flex flex-col justify-between">
          <p className="font-lato text-3xl max-w-2xl text-[#56585B] leading-relaxed">
            The University of Ghana is committed to working with industry to
            create a brighter future for Ghana. We believe that by working
            together, we can create a more prosperous and equitable society for
            all Ghanaians.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-5 py-3 rounded-sm bg-[#153D6D] text-white text-sm w-52"
          >
            List Your Partnerships
          </button>
        </div>
        <img
          src={africanPrint}
          alt="africa-print"
          className="aspect-w-16  border border-red-500"
        />
      </div>

      <div className="mt-20">
        <h1 className="font-extrabold font-poppins text-5xl text-center">
          Top Partners
        </h1>
        <div className="max-w-[1300px] flex justify-between items-center mb-10 ">
          <img src={german} alt="deloitte" className="w-72 h-40" />
          <img src={GNPC} alt="deloitte" className="w-44 h-52" />
          <img src={masterCard} alt="deloitte" className="w-72 h-40 " />
          <img src={tullow} alt="deloitte" className="w-72 h-80 " />
          <img src={deloitte} alt="deloitte" className="w-72 h-40" />
          <Modal open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Main;
