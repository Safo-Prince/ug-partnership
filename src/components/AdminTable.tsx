import Pagination from "./Pagination";
import Filter from "./Filter";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { columns } from "../constants/constants";

const AdminTable: React.FC = () => {
  return (
    <div className="mx-auto w-full sm:max-w-7xl py-16 sm:py-20 lg:px-8 px-6   h-full relative">
      <div className="flex sm:flex-row flex-col justify-between  items-center">
        <Filter />
        <Pagination />
      </div>
      <div className=" shadow ring-1 ring-black ring-opacity-5 overflow-x-scroll sm:rounded-lg mt-4 ">
        <table className="min-w-full divide-y divide-gray-300   border-b">
          <TableHeader columns={columns} />
          <TableBody />
        </table>
        <div className="absolute right-1/2 translate-x-1/2 ">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
