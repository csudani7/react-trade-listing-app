import * as React from "react";

export const QuotesTableRow: React.FunctionComponent<any> = ({ row, id }) => {
  const rowCss =
    "border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8";
  return (
    <tr
      {...row.getRowProps()}
      className={id % 2 === 0 ? "divide-x divide-gray-200" : "bg-gray-50 divide-x divide-gray-200"}
    >
      <td className="border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        <div>{row.values.time}</div>
      </td>

      <td className={rowCss}>
        <div>{row.values.price}</div>
      </td>
      <td className={rowCss}>
        <div>{row.values.valid_till}</div>
      </td>
    </tr>
  );
};
