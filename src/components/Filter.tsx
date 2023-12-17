import * as React from 'react';
import { FileMinus } from "@phosphor-icons/react";


interface FilterProps {
  onSelectFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSelectFilter }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectFilter(event.target.value);
  };

  const handleDownloadAllPdf = async () => {
    try {
      // Make a request to your server to generate and download the PDF for all partnerships
      const response = await fetch('hhttp://197.255.126.63:3001/api/download-all-pdf');
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Get the blob data from the response
      const blob = await response.blob();
  
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'all_partnerships.pdf';
      link.click();
    } catch (error) {
      console.error('Error downloading all PDFs:', error);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* ... (your existing code) */}
      <select
        id="filter"
        name="filter"
        className="mt-2 block self-center mb-2.5 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="choose filter ..."
        onChange={handleFilterChange}
      >
        <option>choose filter ...</option>
        <option>Active</option>
        <option>Terminated</option>
      </select>
      <FileMinus
        size={25}
        color="black"
        className="cursor-pointer"
        onClick={handleDownloadAllPdf} // Assuming `handleDownloadAllPdf` is the function to handle the click
      />
    </div>
  );
};

export default Filter;
