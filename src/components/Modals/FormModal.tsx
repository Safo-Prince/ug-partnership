import * as React from 'react';
{/* @ts-ignore */}
import { Children, FormEvent, Fragment, useState, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus, X } from "@phosphor-icons/react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const FormModal: React.FC<Props> = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    partnership_name: "",
    email: "",
    location: "--select college--",
    comment: "",
    category: "--select category--",
    partner_type: "--select partner type---",
    industry: "",
    secondary_partners: "",
    duration: "",
    status: "",
    start_date: "",
    end_date: "",
    newKeyword: "", // new property for the input value
    keywords: [],
    files: [],
    
  });

  {/* @ts-ignore */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddKeyword = () => {
    const newKeyword = formData.newKeyword.trim();

    if (newKeyword !== "") {
      {/* @ts-ignore */}
      setFormData((prevData) => ({ ...prevData,
        keywords: [...prevData.keywords, newKeyword],
        newKeyword: "", // clear the input after adding a keyword
      }));
    }
  };

  {/* @ts-ignore */}
  const handleRemoveKeyword = (index) => {
    setFormData((prevData) => {
      const newKeywords = [...prevData.keywords];
      newKeywords.splice(index, 1);
      return { ...prevData, keywords: newKeywords };
    });
  };

  {/* @ts-ignore */}
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      start_date: date.startDate,
      end_date: date.endDate,
    }));
  };



  {/* @ts-ignore */}
  const handleFileChange = (e) => {
    {/* @ts-ignore */}
    const selectedFiles = Array.from(e.target.files);
    {/* @ts-ignore */}
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...selectedFiles],
    }));
  };

  {/* @ts-ignore */}
  const handleRemoveFile = (index) => {
    setFormData((prevData) => {
      const newFiles = [...prevData.files];
      newFiles.splice(index, 1);
      return { ...prevData, files: newFiles };
    });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      // Append files to FormData
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          formDataToSend.append("files", formData.files[i]);
        }
      }

      // Append other form data properties
      Object.keys(formData).forEach((key) => {
        if (key !== "files") {
          {/* @ts-ignore */}
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch("http://197.255.126.63:3001/submit-form", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setOpen(false);
        // Refresh the page to clear input fields
        window.location.reload();
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
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
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  text-center font-semibold leading-6 text-gray-900 mt-6"
                    >
                      Partnership Detail Form
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-2 space-y-3">
                      <input
                        type="text"
                        name="partnership_name"
                        placeholder="Name of partnership"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={formData.partnership_name}
                        onChange={handleInputChange}
                      />

                        <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={formData.email}
                        onChange={handleInputChange}
                      />


                      <select
                        id="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      >
                        <option value="--select college--">--select college---</option>
                        <option value="College Of Health Sciences">College Of Health Sciences</option>
                        <option value="College Of Basic and Applied Science">College Of Basic And Applied Sciences</option>
                        <option value="College Of Humanity">College Of Humanities</option>
                        <option value="College Of Education">College Of Education</option>
                      </select>


                      <textarea
                        rows={4}
                        id="comment"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="comment"
                        placeholder="Description"
                        value={formData.comment}
                        onChange={handleInputChange}
                      />


                      <select
                        id="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option>--select category---</option>
                        <option value="Research">Research</option>
                        <option value="Development">Development</option>
                        <option value="Internship">Internship</option>
                        <option value="Training">Training</option>
                        <option value="Course development">Course development</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Commercialism">Commercialism</option>
                        <option value="Multi-purpose">Multi-purpose</option>
                      </select>


                      <select
                        id="location"
                        name="partner_type"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        
                        value={formData.partner_type}
                        onChange={handleInputChange}
                      >
                        <option value="--select partner type---">--select partner type---</option>
                        <option value="Local Company">Local Company</option>
                        <option value="Foreign Entity">Foreign Entity</option>
                        <option value="Ministry">Ministry</option>
                        <option value="Department or Agency of Government">Department or Agency of Government</option>
                      </select>



                      <input
                        placeholder="Industry"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name="industry"
                        
                        value={formData.industry}
                        onChange={handleInputChange}
                      />



                      <div className="flex items-center space-x-2">
                          <div className="flex max-w-min rounded-md border">
                            <input
                              value={formData.newKeyword}
                              onChange={handleInputChange}
                              placeholder="Add Keyword"
                              name="newKeyword"
                              className="block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-0 ring-0 sm:text-sm sm:leading-6"
                            />
                            <button
                              type="button"
                              onClick={handleAddKeyword}
                              className="border-2 border-dotted border-stone-200 py-1 px-1 rounded-md"
                            >
                              <Plus size={20} color="#d6cdcd" />
                            </button>
                          </div>

                          <div className="grid grid-cols-3 grid-rows-3 gap-1">
                          {formData.keywords.map((item, index) => (
                          <span
                            key={index}
                            className="py-1.5 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-pointer" // Changed to cursor-pointer
                          >
                            <span>{item}</span>
                            <XMarkIcon
                              className="cursor-pointer" // Added cursor-pointer
                              onClick={() => handleRemoveKeyword(index)}
                            />
                          </span>
                        ))}

                          </div>
                      </div>

                      <input
                        placeholder="Secondary partners"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name="secondary_partners"
                        
                        value={formData.secondary_partners}
                        onChange={handleInputChange}
                      />

                      <input
                        
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />


                      <select
                        id="status"
                        name="status"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Status Of Partnership---</option>
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                      </select>


                      <div>
                        <p className="pl-2">Start Date ~ End Date</p>
                        <Datepicker
                          value={{
                            startDate: formData.start_date,
                            endDate: formData.end_date,
                          }}
                          onChange={handleDateChange}
                        />
                      </div>

                      <div className="b">
            <div className="flex items-center space-x-3">
              <label
                id="input-file"
                className="cursor-pointer border-dotted border-2 w-10 h-10  flex items-center justify-center"
              >
                <input
                  id="input-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple // Allow multiple files
                />
                <Plus size={20} color="#d6cdcd" />
              </label>
              <span>Add relevant files</span>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-1">
            {formData.files && formData.files.map((file, index) => (
                <div
                  key={index}
                  className="py-1.5 px-1.5 bg-[#E6F1F4] text-[#1391B3] text-sm rounded-md flex space-x-1 items-center justify-between cursor-"
                >
                  {/* @ts-ignore */}
                  <span>{file.name}</span>
                  <X
                    size={12}
                    className="cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  />
                </div>
              ))}
            </div>
          </div>

                      <button
                          type="submit"
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
                          
                          Submit
                        </button>
                    </form>
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

export default FormModal;