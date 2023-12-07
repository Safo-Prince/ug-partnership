import { FC } from "react";

interface Props {
  columns: { name: string }[];
}

const TableHeader: FC<Props> = ({ columns }): JSX.Element => {
  return (
    <thead className="text-left bg-[#F6F6F6] font-lato font-normal text-base">
      <tr className="">
        {columns.map((column, index) => (
          <th
            scope="col"
            key={index}
            className={`py-7 pl-4 text-left text-base font-semibold text-gray-900 ${
              index === 0 ? "" : null
            } `}
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
