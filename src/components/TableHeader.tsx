import { FC } from "react";

interface Props {
  columns: { name: string }[];
}

const TableHeader: FC<Props> = ({ columns }): JSX.Element => {
  return (
    <thead className="bg-gray-50">
      <tr className="px-4">
        {columns.map((column, index) => (
          <th
            scope="col"
            key={index}
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;


