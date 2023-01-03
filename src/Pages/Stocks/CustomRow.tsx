import * as React from "react";

export const StocksTableRow: React.FunctionComponent<any> = ({ row, onClickHandler }) => {
  return (
    <tr {...row.getRowProps()} className="border border-black">
      <td className="border border-black cursor-pointer">
        <div onClick={() => onClickHandler(row.values.Symbol)}>{row.values.Symbol}</div>
      </td>

      <td className="border border-black">
        <div>{row.values.Name}</div>
      </td>
      <td className="border border-black">
        <div>{row.values.Sector}</div>
      </td>

      <td className="border border-black">
        <div>{row.values.Validtill}</div>
      </td>
    </tr>
  );
};
