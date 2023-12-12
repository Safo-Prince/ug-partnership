const TableShimmer: React.FC = () => {
  const numRows = 10;
  const rows = Array.from({ length: numRows }, (_, index) => index);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {rows.map((rowIndex) => (
        <tr key={rowIndex} className=" px-10 ">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3  text-sm text-gray-500 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
          <td className="py-4 pl-4 pr-3 sm:pl-6   ">
            <div className="h-3 bg-slate-200 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableShimmer;
