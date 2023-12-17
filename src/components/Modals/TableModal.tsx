import * as React from 'react';
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";






interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: {
    modalData: {
      id: number;
      // other properties...
    } | null;
    // ... other properties
  };
  
}

const TableModal: React.FC<Props> = ({ open, setOpen, rowData }) => {
  const [modalData, setModalData] = useState(null);
  {/* @ts-ignore */}
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    const fetchModalData = async () => {
      try {
        // Make an API call to fetch additional details for the selected row
        {/* @ts-ignore */}
        const response = await fetch(`http://197.255.126.63:3001/api/data/${rowData.id}`);
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


  function getFileNameFromPath(filePath: string): string {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
}


  
  



  // Function to handle sending the email
const handleSendEmail = async (status: string) => {
  try {
    // Make a request to your server to send the email
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      

      
      body: JSON.stringify({ modalId: rowData.modalData?.id,status: status,
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Log a success message or handle as needed
    console.log('Email sent successfully');
    setOpen(false);
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
                      {/* @ts-ignore */}
                      { modalData && modalData.partnership_name}
                    </Dialog.Title>
                    <div className="border border-stone-500 mt-3 mb-3 " />

                    <div className="space-y-3 flex flex-col items-start">
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          College
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          {/* @ts-ignore */}
                        { modalData && modalData.location}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          Description
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          {/* @ts-ignore */}
                        {modalData && modalData.comment}
                        </p>
                      </div>
                      <div className="font-lato   ">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Category
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                          {/* @ts-ignore */}
                        { modalData && modalData.category}
                        </p>
                      </div>

                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Partner Type
                        </h1>
                        <p className="text-[#56585B]  text-xs sm:text-base">
                          {/* @ts-ignore */}
                        { modalData && modalData.partner_type}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Duration
                        </h1>
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          {/* @ts-ignore */}
                        { modalData && modalData.duration}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg ">
                          Status
                        </h1>
                        <p className="text-[#56585B] text-xs sm:text-base">
                          {" "}
                          {/* @ts-ignore */}
                          { modalData && modalData.status}
                        </p>
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          Relevant Files
                        </h1>
                        {/* @ts-ignore */}
                        {modalData && modalData.files && modalData.files.split(',').map((filePath: string, index: number) => (
                            <p key={index} className="text-[#007BFF] text-left text-xs sm:text-base">
                              <a href={`http://localhost:3001/api/download/${getFileNameFromPath(filePath)}`} download>
                                {getFileNameFromPath(filePath)}
                              </a>
                            </p>
                          ))}


                      </div>
                    </div>

                    <div className="flex justify-around mt-5 space-x-5">
                    <button
                        className="rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]"
                        onClick={() => handleSendEmail('approved')} // Pass 'approved' for the accept button
                      >
                        Accept
                      </button>

                      <button
                        className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleSendEmail('pending')} // Pass 'pending' for the pending button
                      >
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
