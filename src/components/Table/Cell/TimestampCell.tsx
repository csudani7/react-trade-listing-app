import React from "react";
import moment from "moment";
import { CellProps } from ".";

interface TimestampCellProps extends CellProps {
  val: string;
}

function TimestampCell({ val }: TimestampCellProps) {
  return (
    <div>
      <span>{moment(val).format("MMMM Do YYYY, h:mm a")}</span>
    </div>
  );
}
export default TimestampCell;
