import * as React from "react";

export const StocksTableRow: React.FunctionComponent<any> = ({ row, onClickHandler, id }) => {
  const rowCss =
    "border-b border-gray-200 whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900";
  return (
    <tr
      {...row.getRowProps()}
      className={id % 2 === 0 ? "divide-x divide-gray-200" : "bg-gray-50 divide-x divide-gray-200"}
    >
      <td className={`${rowCss} cursor-pointer`}>
        <div onClick={() => onClickHandler(row.values.Symbol)}>{row.values.Symbol}</div>
      </td>

      <td className={rowCss}>
        <div>{row.values.Name}</div>
      </td>
      <td className={rowCss}>
        <div>{row.values.Sector}</div>
      </td>

      <td className={rowCss}>
        <div>{row.values.Validtill}</div>
      </td>
    </tr>
  );
};
