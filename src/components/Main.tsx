import { useState } from "react";
import deloitte from "../assets/deloitte.png";
import tullow from "../assets/tullow-oil.png";
import german from "../assets/german.png";
import masterCard from "../assets/mastercard.png";
import africanPrint from "../assets/african-print.png";
import GNPC from "../assets/gnpc.png";
import Modal from "./Modal";
import "../styles/main.css";

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="background-image pt-44  border">
      <div className="mx-auto max-w-7xl px-6  sm:py-20 ">
        <p className="font-bold text-7xl text-[#3D3D3D] font-poppins ">
          <h1>Industry-Academia Synergy:</h1>
          <h1 className="mt-2">Driving The University’s Progress</h1>
        </p>

        <div className="flex justify-between mt-14">
          <div className="flex flex-col justify-between">
            <p className="font-lato text-3xl max-w-2xl text-[#56585B] leading-relaxed">
              The University of Ghana is committed to working with industry to
              create a brighter future for Ghana. We believe that by working
              together, we can create a more prosperous and equitable society
              for all Ghanaians.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="px-5 py-3 rounded-sm bg-[#153D6D] text-white text-sm w-52"
            >
              List Your Partnerships
            </button>
          </div>
          <img src={africanPrint} alt="african-print" className="w-80" />
        </div>

        <div className="mt-24">
          <h1 className="font-extrabold font-poppins text-5xl text-center text-[#56585B]">
            Top Partners
          </h1>
          <div className="max-w-[1300px] flex justify-around items-center mt-10 ">
            <img src={deloitte} alt="deloitte" className="w-32" />
            <img src={GNPC} alt="dgnpc" className="w-32" />
            <img src={german} alt="german" className="w-32 " />
            <img src={masterCard} alt="master-card" className="w-32 " />
            <img src={tullow} alt="tullow" className="w-32 " />

            <Modal open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
