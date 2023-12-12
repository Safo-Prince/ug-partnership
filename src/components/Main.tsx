import { useState } from "react";
import deloitte from "../assets/deloitte.png";
import tullow from "../assets/tullow-oil.png";
import german from "../assets/german.png";
import masterCard from "../assets/mastercard.png";
import africanPrint from "../assets/african-print.png";
import GNPC from "../assets/gnpc.png";
import FormModal from "./Modals/FormModal";
import "../styles/main.css";

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="background-image  pt-0    border">
      <div className="mx-auto max-w-7xl px-6  py-11 lg:py-20 ">
        <p className="font-bold text-xl  sm:text-3xl lg:text-5xl xl:text-7xl text-[#3D3D3D] font-poppins text-center sm:text-left ">
          <h1>Industry-Academia Synergy:</h1>
          <h1 className="mt-2">Driving The University’s Progress</h1>
        </p>

        <div className="flex justify-between mt-7 lg:mt-14">
          <div className="flex flex-col justify-between">
            <p className="font-lato text-lg sm:text-3xl max-w-2xl text-[#56585B] leading-relaxed text-center sm:text-left">
              The University of Ghana is committed to working with industry to
              create a brighter future for Ghana. We believe that by working
              together, we can create a more prosperous and equitable society
              for all Ghanaians.
            </p>
            <div className="flex justify-center mt-4 sm:block sm:mt-0">
              <button
                onClick={() => setOpen(true)}
                className="sm:px-5 sm:py-3 px-1 py-2 rounded-sm bg-[#153D6D] text-white sm:text-sm sm:w-52 w-44 text-xs"
              >
                List Your Partnerships
              </button>
            </div>
          </div>
          <img
            src={africanPrint}
            alt="african-print"
            className="w-64 hidden sm:block"
          />
        </div>

        <div className="mt-24">
          <h1 className="font-extrabold font-poppins text-2xl sm:text-3xl lg:text-5xl text-center text-[#56585B]">
            Top Partners
          </h1>
          <div className="max-w-[1300px] flex justify-around sm:mt-10 mt-5 ">
            <img src={deloitte} alt="deloitte" className="sm:w-32 w-14" />
            <img src={GNPC} alt="dgnpc" className="sm:w-32 w-16" />
            <img src={german} alt="german" className="sm:w-44 w-16 " />
            <img
              src={masterCard}
              alt="master-card"
              className="sm:w-44 h-auto  w-16"
            />
            <img src={tullow} alt="tullow" className="sm:w-32 w-20 " />

            <FormModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
