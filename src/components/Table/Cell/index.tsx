import React from "react";
import clsx from "clsx";
import { Cell } from "react-table";

import ActionCell from "./ActionCell";
import BoldCell from "./BoldCell";
import StyledCell from "./StyledCell";
import TimestampCell from "./TimestampCell";

export enum CellType {
  Action = "Action",
  Bold = "Bold",
  Styled = "Styled",
  Timestamp = "Timestamp",
  Normal = "Normal",
}

export interface CellProps {
  type?: CellType;
}

export function getCell(type: CellType, value: any) {
  let cellValue: any = value;
  switch (type) {
    case CellType.Action:
      cellValue = <ActionCell {...value} />;
      break;
    case CellType.Bold:
      cellValue = <BoldCell {...value} />;
      break;
    case CellType.Timestamp:
      cellValue = <TimestampCell {...value} />;
      break;
    case CellType.Styled:
      cellValue = <StyledCell {...value} />;
      break;
    default:
      break;
  }
  return cellValue;
}

function TableCell({ cell, className }: { cell: Cell<any, any>; className: string }) {
  const { value } = cell;
  let cellValue: any = value;

  if (typeof value === "object") {
    const { type } = value;
    cellValue = getCell(type, value);
  }

  return (
    <td
      {...cell.getCellProps()}
      className={clsx(
        "bg-white font-medium text-sm text-gray-900 md:py-4 md:px-4 whitespace-nowrap",
        className,
      )}
    >
      {cellValue}
    </td>
  );
}
export default TableCell;
