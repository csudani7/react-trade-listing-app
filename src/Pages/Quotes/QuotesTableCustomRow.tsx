import * as React from "react";

export const QuotesTableRow: React.FunctionComponent<any> = ({ row }) => {
  return (
    <tr {...row.getRowProps()} className="border border-black">
      <td className="border border-black cursor-pointer">
        <div>{row.values.time}</div>
      </td>

      <td className="border border-black">
        <div>{row.values.price}</div>
      </td>
      <td className="border border-black">
        <div>{row.values.valid_till}</div>
      </td>
    </tr>
  );
};
