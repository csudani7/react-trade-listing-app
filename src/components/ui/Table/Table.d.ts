import React from "react";
declare namespace ITable {
  export interface IProps {
    id?: string;
    data: Array<object>;
    columns: Array<{ Header: string; accessor: string }>;
    customRow: React.ComponentType<P>;
  }
}
export { ITable };
