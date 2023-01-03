import * as React from "react";

export const StocksTableRow: React.FunctionComponent<any> = ({ row }) => {
  return (
    <tr {...row.getRowProps()}>
      <td className="cursor-pointer">
        <div onClick={() => window.console.log(`${row.original.Symbol} clicked`)}>
          {row.original.Symbol}
        </div>
      </td>

      <td>
        <div>{row.original.Name}</div>
      </td>
      <td>
        <div>{row.original.Sector}</div>
      </td>

      <td>
        <div>{row.original.Validtill}</div>
      </td>
    </tr>
  );
};
