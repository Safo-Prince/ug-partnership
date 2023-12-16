import * as React from 'react';
{/* @ts-ignore */}
import { Fragment, useState } from "react";
{/* @ts-ignore */}
import { Dialog, Transition } from "@headlessui/react";
{/* @ts-ignore */}
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Plus } from "@phosphor-icons/react";



const YourReactComponent = () => {
  const [formData, setFormData] = useState({
    partnershipName: "",
    location: "--select college--",
    comment: "",
    category: "--select category--",
    partnerType: "--select partner type---",
    industry: "",
    secondaryPartners: "",
    duration: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  {/* @ts-ignore */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  {/* @ts-ignore */}
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        // Additional logic after successful form submission
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form input elements */}
      <input
        type="text"
        name="partnershipName"
        placeholder="Name of partnership"
        value={formData.partnershipName}
        onChange={handleInputChange}
      />
      <select
        name="location"
        value={formData.location}
        onChange={handleInputChange}
      >
        <option value="--select college--">--select college---</option>
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
      </select>
      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleInputChange}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="--select category--">--select category---</option>
        <option value="Category1">Category1</option>
        <option value="Category2">Category2</option>
        <option value="Category3">Category3</option>
      </select>
      <select
        name="partnerType"
        value={formData.partnerType}
        onChange={handleInputChange}
      >
        <option value="--select partner type---">--select partner type---</option>
        <option value="Type1">Type1</option>
        <option value="Type2">Type2</option>
        <option value="Type3">Type3</option>
      </select>
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="secondaryPartners"
        placeholder="Secondary partners"
        value={formData.secondaryPartners}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="startDate"
        placeholder="Start date"
        value={formData.startDate}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="endDate"
        placeholder="End date"
        value={formData.endDate}
        onChange={handleInputChange}
      />

      <div className="b">
        <div className="flex items-center space-x-3">
          <label id="input-file" className="cursor-pointer border-dotted border-2 w-10 h-10  flex items-center justify-center ">
            <input id="input-file" className="hidden" type="file" />
            <Plus size={20} color="#d6cdcd" />
          </label>
          <span>Add relevant files</span>
        </div>
      </div>

      <button type="submit" className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[#153D6D]">
        Submit
      </button>
    </form>
  );
};

export default YourReactComponent;
