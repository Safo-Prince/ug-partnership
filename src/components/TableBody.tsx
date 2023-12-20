import * as React from "react";
import { useEffect, useState } from "react";
import { Eye, Trash } from "iconsax-react";
import { FileMinus } from "@phosphor-icons/react";
import TableModal from "./Modals/TableModal";
import TableShimmer from "./shimmers/TableShimmer";
import Filter from "./Filter"; // Import the Filter component
import { downloadPdf } from "./pdfUtils";

interface Props {
  selectedFilter: string;
}

const TableBody: React.FC<Props> = ({ selectedFilter }) => {
  //const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  //const [todayDate, setTodayDate] = useState('');
  // const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row
  const [openModal, setOpenModal] = useState(false);
  //const [modalData, setModalData] = useState(null); // Define modalData state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://197.255.126.63:3001/api/data?filter=${selectedFilter}`
        );
        const data = await response.json();

        // Sort the data based on the 'id' property in descending order
        const sortedData = data.sort(
          (a: { id: number }, b: { id: number }) => b.id - a.id
        );

        setTableData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  // const handleSelectFilter = (filter: string) => {
  //   setSelectedFilter(filter);
  // };

  // Function to handle downloading the PDF
  {
    /* @ts-ignore */
  }
  const handleDownloadPdf = (rowData) => {
    downloadPdf(rowData);
  };

  return (
    <>
      {/* <Filter onSelectFilter={handleSelectFilter} /> */}
      {/* @ts-ignore */}
      <TableModal
        open={openModal}
        setOpen={setOpenModal}
        rowData={selectedRow}
      />

      {isLoading ? (
        <TableShimmer />
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* @ts-ignore */}
          {tableData.map((rowData) => (
            <tr key={rowData.id} className="px-10">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.upload_date}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.partnership_name}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.partner_type}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.location}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.category}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {/* @ts-ignore */}
                {rowData.status}
              </td>
              {/* Add other columns based on your data structure */}
              <td className="py-4 pl-4 pr-3 sm:pl-6">
                <div className="flex items-center space-x-1">
                  <Eye
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedRow(rowData); // Set the selected row when the eye button is clicked
                    }}
                    size="25"
                    color="black"
                    className="cursor-pointer"
                  />
                  <FileMinus
                    size={25}
                    color="#007BFF"
                    onClick={() => {
                      handleDownloadPdf(rowData);
                      setSelectedRow(rowData); // Set the selected row when the eye button is clicked
                    }}
                    className="cursor-pointer"
                  />
                  <Trash size="25" color="#FF0000" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default TableBody;
