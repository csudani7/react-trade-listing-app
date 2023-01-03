import React from "react";
declare namespace ITable {
  export interface IProps {
    id?: string;
    data: Array<object>;
    columns: Array<{ Header: string; accessor: string }>;
    /* eslint-disable no-undef */
    customRow: React.ComponentType<P>;
    onClickHandler?: (symbol: string) => void;
    isGlobalFilter?: boolean;
  }
}
export { ITable };
