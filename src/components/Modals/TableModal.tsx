import * as React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface EditedFields {
  location: { value: string; isEditing: boolean };
  comment: { value: string; isEditing: boolean };
  category: { value: string; isEditing: boolean };
  partner_type: { value: string; isEditing: boolean };
  status: { value: string; isEditing: boolean };
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: {
    modalData?: {
      id: number;
      // other properties...
    } | null;
    // ... other properties
  };
}

const TableModal: React.FC<Props> = ({ open, setOpen, rowData }) => {
  const [editedFields, setEditedFields] = useState<EditedFields>({
    location: { value: "", isEditing: false },
    comment: { value: "", isEditing: false },
    category: { value: "", isEditing: false },
    partner_type: { value: "", isEditing: false },
    status: { value: "", isEditing: false },
  });
  const [modalData, setModalData] = useState(null);
  {
    /* @ts-ignore */
  }
  /* @ts-ignore */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        // Make an API call to fetch additional details for the selected row
        {
          /* @ts-ignore */
        }
        /* @ts-ignore */
        const response = await fetch(`https://partnerships.ug.edu.gh/api/data/${rowData.id}`);
        const data = await response.json();
        console.log(data);
        setModalData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching modal data:", error);
        setIsLoading(false);
      }
    };

    if (rowData) {
      fetchModalData();
    }
  }, [rowData]);

  function getFileNameFromPath(filePath: string): string {
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  }

  // Function to handle sending the email
  const handleSendEmail = async (status: string) => {
    try {
      /* @ts-ignore */
      const modalId = (modalData as { id?: number })?.id;
      console.log(modalId);

      // Make a request to your server to send the email
      const response = await fetch(
        "https://partnerships.ug.edu.gh/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modalId: modalId,
            status: status,
          }),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Log a success message or handle as needed
      console.log("Email sent successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleEditClick = (field: keyof EditedFields) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: {
        ...prevFields[field],
        value: modalData ? modalData[field] : "",
        isEditing: true,
      },
    }));
  };

  const handleCancelClick = (field: keyof EditedFields) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: false },
    }));
  };

  const handleSaveClick = async (field: keyof EditedFields) => {
    try {
      {/* @ts-ignore */}
      const response = await fetch(`https://partnership.ug.edu.gh/api/update-field/${rowData.id}`,
        {
          method: "PATCH", // Use PATCH method for partial updates
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field,
            value: editedFields[field].value,
          }),
        }
      );
      
  
      const data = await response.json();
      if (data.success) {
        alert(`${field} updated successfully`);
        window.location.reload();
        setEditedFields((prevFields) => ({
          ...prevFields,
          [field]: { ...prevFields[field], isEditing: false },
        }));
      } else {
        console.error(`Error updating field ${field}`);
      }
    } catch (error) {
      console.error(`Error updating field ${field}:`, error);
    }
  };

  console.log(modalData);

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
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl sm:p-6 ">
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
                      {modalData && modalData.partnership_name}
                    </Dialog.Title>
                    <div className="border border-stone-500 mt-3 mb-3 " />

                    <div className="space-y-3 flex flex-col items-start">
                      <div className="flex justify-between items-center w-full">
                        <h1 className="font-bold  text-lg mt-4 text-left">
                          College
                        </h1>
                        <PencilSquareIcon
                          className="h-6 w-6 cursor-pointer "
                          onClick={() => handleEditClick("location")}
                        />
                      </div>
                      {editedFields.location.isEditing ? (
                        <div className="w-full">
                          <textarea
                            rows={1}
                            name="location"
                            id="location"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                            value={editedFields.location.value}
                            onChange={(e) =>
                              setEditedFields((prevFields) => ({
                                ...prevFields,
                                location: {
                                  ...prevFields.location,
                                  value: e.target.value,
                                },
                              }))
                            }
                          />

                          <div className="flex space-x-1 mt-1 justify-end">
                            <button
                              onClick={() => handleCancelClick("location")}
                              className=" rounded-full border-[#153D6D] text-[#153D6D] border-2  px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                              cancel
                            </button>
                            <button
                              onClick={() => handleSaveClick("location")}
                              className="  rounded-full bg-[#153D6D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                              save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#56585B] text-left text-xs sm:text-base">
                          {/* @ts-ignore */}
                          {modalData && modalData.location}
                        </p>
                      )}
                      <div className="font-lato"></div>
                      <div className="font-lato w-full">
                        <div className="flex justify-between items-center w-full">
                          <h1 className="font-bold  text-lg mt-4 text-left">
                            Description
                          </h1>
                          <PencilSquareIcon
                            className="h-6 w-6 cursor-pointer "
                            onClick={() => handleEditClick("comment")}
                          />
                        </div>
                        {editedFields.comment.isEditing ? (
                          <div className="w-full">
                            <textarea
                              rows={1}
                              name="comment"
                              id="comment"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                              value={editedFields.comment.value}
                              onChange={(e) =>
                                setEditedFields((prevFields) => ({
                                  ...prevFields,
                                  comment: {
                                    ...prevFields.comment,
                                    value: e.target.value,
                                  },
                                }))
                              }
                            />

                            <div className="flex space-x-1 mt-1 justify-end">
                              <button
                                onClick={() => handleCancelClick("comment")}
                                className=" rounded-full border-[#153D6D] text-[#153D6D] border-2  px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                cancel
                              </button>
                              <button
                                onClick={() => handleSaveClick("comment")}
                                className="  rounded-full bg-[#153D6D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#56585B] text-left text-xs sm:text-base">
                            {/* @ts-ignore */}
                            {modalData && modalData.comment}
                          </p>
                        )}
                      </div>
                      <div className="font-lato  w-full  ">
                        <div className="flex justify-between items-center w-full">
                          <h1 className="font-bold  text-lg mt-4 text-left">
                            Category
                          </h1>
                          <PencilSquareIcon
                            className="h-6 w-6 cursor-pointer "
                            onClick={() => handleEditClick("category")}
                          />
                        </div>
                        {editedFields.category.isEditing ? (
                          <div className="w-full">
                            <textarea
                              rows={1}
                              name="category"
                              id="category"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                              value={editedFields.category.value}
                              onChange={(e) =>
                                setEditedFields((prevFields) => ({
                                  ...prevFields,
                                  category: {
                                    ...prevFields.category,
                                    value: e.target.value,
                                  },
                                }))
                              }
                            />

                            <div className="flex space-x-1 mt-1 justify-end">
                              <button
                                onClick={() => handleCancelClick("category")}
                                className=" rounded-full border-[#153D6D] text-[#153D6D] border-2  px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                cancel
                              </button>
                              <button
                                onClick={() => handleSaveClick("category")}
                                className="  rounded-full bg-[#153D6D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#56585B] text-left text-xs sm:text-base">
                            <p className="text-[#56585B] text-xs sm:text-base">
                              {/* @ts-ignore */}
                              {modalData && modalData.category}
                            </p>
                          </p>
                        )}
                      </div>

                      <div className="font-lato w-full">
                        <div className="flex justify-between items-center w-full">
                          <h1 className="font-bold  text-lg mt-4 text-left">
                            Partner Type
                          </h1>
                          <PencilSquareIcon
                            className="h-6 w-6 cursor-pointer "
                            onClick={() => handleEditClick("partner_type")}
                          />
                        </div>
                        {editedFields.partner_type.isEditing ? (
                          <div className="w-full">
                            <textarea
                              rows={1}
                              name="partnerType"
                              id="partnerType"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                              value={editedFields.partner_type.value}
                              onChange={(e) =>
                                setEditedFields((prevFields) => ({
                                  ...prevFields,
                                  partner_type: {
                                    ...prevFields.partner_type,
                                    value: e.target.value,
                                  },
                                }))
                              }
                            />

                            <div className="flex space-x-1 mt-1 justify-end">
                              <button
                                onClick={() =>
                                  handleCancelClick("partner_type")
                                }
                                className=" rounded-full border-[#153D6D] text-[#153D6D] border-2  px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                cancel
                              </button>
                              <button
                                onClick={() => handleSaveClick("partner_type")}
                                className="  rounded-full bg-[#153D6D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#56585B]  text-xs sm:text-base">
                            {/* @ts-ignore */}
                            {modalData && modalData.partner_type}
                          </p>
                        )}
                      </div>

                      <div className="font-lato w-full ">
                        <div className="flex justify-between items-center w-full">
                          <h1 className="font-bold  text-lg mt-4 text-left">
                            Status
                          </h1>
                          <PencilSquareIcon
                            className="h-6 w-6 cursor-pointer "
                            onClick={() => handleEditClick("status")}
                          />
                        </div>
                        {editedFields.status.isEditing ? (
                          <div className="w-full">
                            <textarea
                              rows={1}
                              name="status"
                              id="status"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                              value={editedFields.status.value}
                              onChange={(e) =>
                                setEditedFields((prevFields) => ({
                                  ...prevFields,
                                  status: {
                                    ...prevFields.status,
                                    value: e.target.value,
                                  },
                                }))
                              }
                            />

                            <div className="flex space-x-1 mt-1 justify-end">
                              <button
                                onClick={() => handleCancelClick("status")}
                                className=" rounded-full border-[#153D6D] text-[#153D6D] border-2  px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                cancel
                              </button>
                              <button
                                onClick={() => handleSaveClick("status")}
                                className="  rounded-full bg-[#153D6D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#56585B] text-xs sm:text-base">
                            {" "}
                            {/* @ts-ignore */}
                            {modalData && modalData.status}
                          </p>
                        )}
                      </div>
                      <div className="font-lato">
                        <h1 className="text-[#9F9F9F] text-left text-sm sm:text-lg">
                          Relevant Files
                        </h1>
                        {/* @ts-ignore */}
                        {modalData && modalData.files && modalData.files.split(",").map((filePath: string, index: number) => (
                              <p
                                key={index}
                                className="text-[#007BFF] text-left text-xs sm:text-base"
                              >
                                <a
                                  href={`https://partnerships.ug.edu.gh/api/download/${getFileNameFromPath(
                                    filePath
                                  )}`}
                                  download
                                >
                                  {getFileNameFromPath(filePath)}
                                </a>
                              </p>
                            ))}
                      </div>
                    </div>

                    <div className="flex justify-around mt-5 space-x-5">
                      <button
                        className="rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]"
                        onClick={() => handleSendEmail("approved")} // Pass 'approved' for the accept button
                      >
                        Accept
                      </button>

                      <button
                        className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleSendEmail("pending")} // Pass 'pending' for the pending button
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
