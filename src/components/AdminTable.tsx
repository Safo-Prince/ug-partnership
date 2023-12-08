import Pagination from "./Pagination";
import Filter from "./Filter";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const columns = [
  { name: "Sent on" },
  { name: "Name" },
  { name: "Partner" },
  { name: "College" },
  { name: "Category" },
  { name: "Status" },
  { name: "Actions" },
];

const AdminTable: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8  h-full ">
      <div className="flex justify-between  items-center">
        <Filter />
        <Pagination />
      </div>
      <div className="overflow-x-auto  shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-4">
        <table className="min-w-full divide-y divide-gray-300   border-b">
          <TableHeader columns={columns} />
          <TableBody />
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default AdminTable;
