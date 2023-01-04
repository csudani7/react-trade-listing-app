import React from "react";
import { CellProps } from "./";

interface StyledCellProps extends CellProps {
  value: string | React.ReactNode;
  className: string;
}

function StyledCell({ value, className }: StyledCellProps) {
  return <div className={className}>{value}</div>;
}
export default StyledCell;
