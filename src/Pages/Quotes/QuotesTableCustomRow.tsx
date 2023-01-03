import * as React from "react";

export const QuotesTableRow: React.FunctionComponent<any> = ({ row, id }) => {
  const rowCss =
    "border-b border-gray-200 whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900";
  return (
    <tr
      {...row.getRowProps()}
      className={id % 2 === 0 ? "divide-x divide-gray-200" : "bg-gray-50 divide-x divide-gray-200"}
    >
      <td className="px-4 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap">
        <div>{row.values.time}</div>
      </td>

      <td className={rowCss}>
        <div>{row.values.price.toFixed(2)}</div>
      </td>
      <td className={rowCss}>
        <div>{row.values.valid_till}</div>
      </td>
    </tr>
  );
};
