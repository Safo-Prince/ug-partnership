import { useEffect, useState } from "react";
import { Eye, Trash } from "iconsax-react";
import { FileMinus } from "@phosphor-icons/react";
import TableModal from "./Modals/TableModal";
import TableShimmer from "./shimmers/TableShimmer";
const TableBody: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <>
      <TableModal setOpen={setOpen} open={open} />

      {isLoading ? (
        <TableShimmer />
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye
                  onClick={() => setOpen(true)}
                  size="25"
                  color="black"
                  className="cursor-pointer"
                />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-2">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              GIZ Forestry Project
            </td>
            <td className="py-4 pl-4 pr-3 sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <Eye size="25" color="black" />
                <FileMinus size={25} color="#007BFF" />
                <Trash size="25" color="#FF0000" />
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TableBody;
