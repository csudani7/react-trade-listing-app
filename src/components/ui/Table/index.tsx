import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import React from "react";
import { ITable } from "./Table";

const Table: React.FunctionComponent<ITable.IProps> = ({
  id,
  data,
  columns,
  customRow: CustomRow,
  isGlobalFilter = true,
  onClickHandler,
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
    <div className="p-12">
      <div className="w-full">
        <table className="w-full border border-black" {...getTableProps()}>
          <thead className="border border-black">
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
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                  className="border border-black"
                >
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      className="border border-black"
                    >
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
            {isGlobalFilter && (
              <tr>
                <th colSpan={visibleColumns.length} className="p-4 text-left">
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            )}
          </thead>
          <tbody {...getTableBodyProps()} className="border border-black">
            {rows?.map((row: any, index: number) => {
              prepareRow(row);
              return <CustomRow id={id} row={row} key={index} onClickHandler={onClickHandler} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
