import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const TableModal: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ">
                <div className="absolute right-0 top-0  pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex sm:items-start w-full">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  text-center leading-6 text-gray-900 mt-6 font-medium"
                    >
                      GIZ Forestry Project
                    </Dialog.Title>
                    <div className="border border-stone-500 mt-3 mb-3 " />

                    <div className="space-y-3 flex flex-col items-start">
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          College
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          CBAS
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          Description
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          A molasses -based and fruit residue-based supplement
                          formulated to supply the critical nutrients needed to
                          provide optimal conditions for enhanced utilization of
                          fibrous diets in ruminants. The supplement is
                          available in molasses-based, fruit residue-based, rice
                          straw- based, pineapple waste based, and urea-molasses
                          based varieties.
                        </p>
                      </div>
                      <div className="font-lato   ">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Category
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                          Internship
                        </p>
                      </div>

                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Partner Type
                        </h1>
                        <p className="text-[#56585B]  text-xs sm:text-base">
                          Governmental
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Duration
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          3 years
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Status
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                          {" "}
                          In Progress
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Relevant Files
                        </h1>
                        <p className=" text-[#007BFF] text-left text-xs sm:text-base ">
                          Anything
                        </p>
                        <p className="text-[#007BFF] text-left text-xs sm:text-base">
                          {" "}
                          NDA.PDF
                        </p>
                        <p className="text-[#007BFF] text-left text-xs sm:text-base">
                          {" "}
                          MOU.pdf{" "}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-around mt-5 space-x-5">
                      <button className="  rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f] ] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Accept
                      </button>
                      <button className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TableModal;
