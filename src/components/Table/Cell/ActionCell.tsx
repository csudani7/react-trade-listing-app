import React from "react";
import { CellProps } from ".";

interface ActionCellProps extends CellProps {
  href: string;
  label: string;
}

function ActionCell({ href, label }: ActionCellProps) {
  return (
    <a href={href} className={`text-sm font-medium inline-flex text-[#05adbb]`}>
      <span className="not-italic leading-5 tracking-wider uppercase">{label}</span>
    </a>
  );
}
export default ActionCell;
