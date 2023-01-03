import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import React from "react";
import { ITable } from "./Table";

const Table: React.FunctionComponent<ITable.IProps> = ({
  id,
  data,
  columns,
  customRow: CustomRow,
}): JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    visibleColumns,
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </span>
    );
  }

  return (
    <div>
      <div className="w-full">
        <table style={{ width: "100%" }} {...getTableProps()}>
          <thead>
            {headerGroups.map(
              (
                headerGroup: {
                  getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableRowElement> &
                    React.HTMLAttributes<HTMLTableRowElement>;
                  headers: any[];
                },
                index: number,
              ) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                      <div>
                        <div>{column.render("Header")}</div>
                        {column.canSort && (
                          <div>
                            {column.isSorted ? (
                              <div />
                            ) : (
                              <div>
                                <div />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ),
            )}
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.map((row: any, index: number) => {
              prepareRow(row);
              return <CustomRow id={id} row={row} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
