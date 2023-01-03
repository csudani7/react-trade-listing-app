import * as React from "react";

export const StocksTableRow: React.FunctionComponent<any> = ({ row, onClickHandler }) => {
  return (
    <tr {...row.getRowProps()} className="border border-black">
      <td className="border border-black cursor-pointer">
        <div onClick={() => onClickHandler(row.original.Symbol)}>{row.original.Symbol}</div>
      </td>

      <td className="border border-black">
        <div>{row.original.Name}</div>
      </td>
      <td className="border border-black">
        <div>{row.original.Sector}</div>
      </td>

      <td className="border border-black">
        <div>{row.original.Validtill}</div>
      </td>
    </tr>
  );
};
