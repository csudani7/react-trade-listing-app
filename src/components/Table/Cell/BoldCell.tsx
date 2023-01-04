import React from "react";
import { CellProps } from ".";

interface BoldCellProps extends CellProps {
  val: string;
}

function BoldCell({ val }: BoldCellProps) {
  return (
    <div>
      <span className="font-bold">{val}</span>
    </div>
  );
}
export default BoldCell;
