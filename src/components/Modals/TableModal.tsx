import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
  rowData: any; // Add rowData prop
}
const TableModal: React.FC<Props> = ({ open, setOpen, rowData }) => {
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    const fetchModalData = async () => {
      try {
        // Make an API call to fetch additional details for the selected row
        const response = await fetch(`http://localhost:3001/api/data/${rowData.id}`);
        const data = await response.json();
        console.log(data)
        setModalData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching modal data:', error);
        setIsLoading(false);
      }
    };

    if (rowData) {
      fetchModalData();
    }
  }, [rowData]);



  // Function to handle sending the email
const handleSendEmail = async () => {
  try {
    // Make a request to your server to send the email
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modalId: modalData.id,
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Log a success message or handle as needed
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


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
                      { modalData && modalData.partnership_name}
                    </Dialog.Title>
                    <div className="border border-stone-500 mt-3 mb-3 " />

                    <div className="space-y-3 flex flex-col items-start">
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          College
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                        { modalData && modalData.location}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          Description
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                        {modalData && modalData.comment}
                        </p>
                      </div>
                      <div className="font-lato   ">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Category
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                        { modalData && modalData.category}
                        </p>
                      </div>

                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Partner Type
                        </h1>
                        <p className="text-[#56585B]  text-xs sm:text-base">
                        { modalData && modalData.partner_type}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Duration
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                        { modalData && modalData.duration}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Status
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                          {" "}
                          { modalData && modalData.status}
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
                    <button
                        className="rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]"
                        onClick={handleSendEmail}
                      >
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
