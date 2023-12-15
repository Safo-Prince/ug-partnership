import { useEffect, useState } from "react";
import { Eye, Trash } from "iconsax-react";
import { FileMinus } from "@phosphor-icons/react";
import TableModal from "./Modals/TableModal";
import TableShimmer from "./shimmers/TableShimmer";
import Filter from "./Filter"; // Import the Filter component
import { downloadPdf } from './pdfUtils';
import { handleDownloadAllPdf } from './pdfUtils'; // 


const TableBody: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(''); // For the filter
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Define modalData state

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/data?filter=${selectedFilter}`);       
        const data = await response.json();
        setTableData(data);

        // Fetch today's date when the component mounts
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US');

        setTodayDate(formattedDate);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };


  // Function to handle downloading the PDF
  const handleDownloadPdf = (rowData) => {
    downloadPdf(rowData);
  };

  

  return (
    <>

      <Filter onSelectFilter={handleSelectFilter} />
      <TableModal open={openModal} setOpen={setOpenModal} rowData={selectedRow}  />

      {isLoading ? (
        <TableShimmer />
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          {tableData.map((rowData) => (
            <tr key={rowData.id} className="px-10">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {rowData.upload_date}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.partnership_name}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.partner_type}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.location}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.category}
              </td>

              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
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
