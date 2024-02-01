import * as React from "react";
{
  /* @ts-ignore */
}
/* @ts-ignore */
import { Children, FormEvent, Fragment, useState, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus, X } from "@phosphor-icons/react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

interface FormData {
  partnership_name: string;
  email: string;
  location: string;
  comment: string;
  category: string;
  partner_type: string;
  industry: string;
  key_partner: string;
  secondary_partners: string;
  duration: string;
  status: string;
  start_date: string;
  end_date: string;
  newKeyword: string;
  keywords: string[];
  files: any[];
}

const FormModal: React.FC<Props> = ({ open, setOpen }) => {
  const [buttonText, setButtonText] = useState("submit");
  const [formData, setFormData] = useState<FormData>({
    partnership_name: "",
    email: "",
    location: "--select college--",
    comment: "",
    category: "--select category--",
    partner_type: "--select partner type---",
    industry: "",
    key_partner: "",
    secondary_partners: "",
    duration: "",
    status: "",
    start_date: "",
    end_date: "",
    newKeyword: "", // new property for the input value
    keywords: [],
    files: [],
  });

  {
    /* @ts-ignore */
  }
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /* @ts-ignore */
  const handleAddKeyword = () => {
    const newKeyword = formData.newKeyword.trim();

    if (newKeyword !== "") {
      {
        /* @ts-ignore */
      }
      setFormData((prevData) => ({
        ...prevData,
        keywords: [...prevData.keywords, newKeyword],
        newKeyword: "", // clear the input after adding a keyword
      }));
    }
  };

  {
    /* @ts-ignore */
  }
  /* @ts-ignore */
  const handleRemoveKeyword = (index: any) => {
    setFormData((prevData) => {
      const newKeywords = [...prevData.keywords];
      newKeywords.splice(index, 1);
      return { ...prevData, keywords: newKeywords };
    });
  };

  {
    /* @ts-ignore */
  }
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({
      ...prevData,
      start_date: date.startDate,
      end_date: date.endDate,
    }));
  };

  {
    /* @ts-ignore */
  }
  const handleFileChange = (e: any) => {
    {
      /* @ts-ignore */
    }
    const selectedFiles = Array.from(e.target.files);
    {
      /* @ts-ignore */
    }
    setFormData((prevData: any) => ({
      ...prevData,
      files: [...prevData.files, ...selectedFiles],
    }));
  };

  {
    /* @ts-ignore */
  }
  const handleRemoveFile = (index: any) => {
    setFormData((prevData) => {
      const newFiles = [...prevData.files];
      newFiles.splice(index, 1);
      return { ...prevData, files: newFiles };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setButtonText("submitting...");

    try {
      const formDataToSend: any = new FormData();
      // Append files to FormData
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          formDataToSend.append("files", formData.files[i]);
        }
      }

      // Append other form data properties
      Object.keys(formData).forEach((key) => {
        if (key !== "files") {
          /* @ts-ignore */
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(
        "https://partnerships.ug.edu.gh/submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        console.log("Form submitted successfully:", responseData.message);
        setOpen(false);
        setButtonText("submit");
        // Refresh the page to clear input fields
        window.location.reload();
      } else {
        console.error("Error submitting form");
        alert("Error Submitting Form; ensure all fields are filled");
        setButtonText("submit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
          <div className="flex min-h-full justify-center p text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 py-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 max-h-[90vh] overflow-y-scroll  ">
                <div className="absolute right-0 top-0  pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#153D6D]] focus:ring-offset-2"
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
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.partnership_name}
                        onChange={handleInputChange}
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.email}
                        onChange={handleInputChange}
                      />

                      <select
                        id="college"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      >
                        <option disabled value="-- select college --">
                          -- Select college --
                        </option>
                        <option value="College of Health Sciences">
                          College of Health Sciences
                        </option>
                        <option value="College of Basic and Applied Science">
                          College of Basic And Applied Sciences
                        </option>
                        <option value="College of Humanities">
                          College of Humanities
                        </option>
                        <option value="College of Education">
                          College of Education
                        </option>
                        <option value="College of Education">
                          Central Administration
                        </option>
                      </select>

                      <textarea
                        rows={2}
                        id="comment"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        name="comment"
                        placeholder="Description"
                        value={formData.comment}
                        onChange={handleInputChange}
                      />

                      <select
                        id="category"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option disabled value="--Select category--">
                          --Select category--
                        </option>
                        <option value="Research">Research</option>
                        <option value="Development">Development</option>
                        <option value="Internship">Internship</option>
                        <option value="Training">Training</option>
                        <option value="Course development">
                          Course development
                        </option>
                        <option value="Innovation">Innovation</option>
                        <option value="Commercialism">Commercialism</option>
                        <option value="Multi-purpose">Multi-purpose</option>
                      </select>

                      <select
                        id="location"
                        name="partner_type"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.partner_type}
                        onChange={handleInputChange}
                        >
                        <option disabled value="--Select partner type---">
                          --Select partner type---
                        </option>
                        <option value="Local Company">Local Company</option>
                        <option value="Foreign Entity">Foreign Entity</option>
                        <option value="Ministry">Ministry</option>
                        <option value="Department or Agency of Government">
                          Department or Agency of Government
                        </option>
                        <option value="Other">Other</option>
                      </select>

                      {formData.partner_type === "Other" && (
                        <input
                          placeholder="If 'Other,' please specify the partner "
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                          type="text"
                          name="other_partner_type"
                          // value={formData.secondary_partners}
                          // onChange={handleInputChange}
                        />
                      )}

                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      >
                        <option disabled value="">
                          --Select industry--
                        </option>
                        <option value="Agri-Business">Agri-Business</option>
                        <option value="Arts and Crafts">Arts and Crafts</option>
                        <option value="Foods and Beverages">
                          Foods and Beverages
                        </option>
                        <option value="Banking,Financial Services including insurances">
                          Banking,Financial Services including insurances
                        </option>
                        <option value="Environment and Sanitation">
                          Environment and Sanitation
                        </option>
                        <option value="Energy & Climate Change">
                          Energy and Climate Change
                        </option>
                        <option value="Engineering">Engineering</option>
                        <option value="Hospitalities and Tourism">
                          Hospitalities and Tourism
                        </option>
                        <option value="Information and Communication Technology including Software">
                          Information and Communication Technology including
                          Software
                        </option>
                        <option value="Health and Biotechnology">
                          Health and Biotechnology
                        </option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.industry === "Other" && (
                        <input
                          placeholder="If 'Other,' please specify the industry "
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                          type="text"
                          name="other_industry_type"
                          // value={formData.secondary_partners}
                          // onChange={handleInputChange}
                        />
                      )}

                      <input
                        placeholder="Key partner"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        type="text"
                        name="key_partner"
                        value={formData.key_partner}
                        onChange={handleInputChange}
                      />
                      <input
                        placeholder="Secondary partner"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        type="text"
                        name="secondary_partners"
                        value={formData.secondary_partners}
                        onChange={handleInputChange}
                      />

                      {/* <input
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      /> */}

                      <select
                        id="status"
                        name="status"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option disabled value="">
                          -- Select status of partnership --
                        </option>
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                      </select>

                      <div className="flex flex-col ">
                        <p className=" text-left mb-2 pl-2 flex space-x-2">
                          <span>Start Date </span> <span>~ </span>
                          <span>End Date</span>
                        </p>

                        <Datepicker
                          className="max-w-md"
                          value={{
                            startDate: formData.start_date,
                            endDate: formData.end_date,
                          }}
                          onChange={handleDateChange}
                          style={{ width: "0px" }}
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
                        <div className="grid grid-cols-1 grid-rows-1 gap-1">
                          {formData.files &&
                            formData.files.map((file, index) => (
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
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]"
                      >
                        {buttonText}
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
