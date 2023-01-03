import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import React from "react";
import { ITable } from "./Table";
import { SortAscIcon, SortDescIcon } from "../../../assets";

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="font-semibold">
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="font-semibold text-gray-800 border-none outline-none"
      />
    </span>
  );
}

const Table: React.FunctionComponent<ITable.IProps> = ({
  data,
  columns,
  customRow: CustomRow,
  isGlobalFilter = true,
  onClickHandler,
}): React.ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  return (
    <div className="px-2 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col mt-8">
        <div className="flex lg:justify-center">
          <div className="inline-block w-3/4 py-2 align-middle">
            <div className="flex flex-col justify-center shadow-sm">
              {isGlobalFilter && (
                <div className="w-full py-4 pl-4 mb-4 text-left border border-black rounded-lg lg:pl-8">
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </div>
              )}
              <table
                className="w-full overflow-hidden divide-y divide-gray-300 rounded-lg border-spacing-0 ring-1 ring-black ring-opacity-5"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map(
                    (
                      headerGroup: {
                        getHeaderGroupProps: () => React.ClassAttributes<HTMLTableRowElement> &
                          React.HTMLAttributes<HTMLTableRowElement>;
                        headers: any[];
                      },
                      index: number,
                    ) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                        className="divide-x divide-gray-600"
                      >
                        {headerGroup.headers.map((column, index) => (
                          <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            key={index}
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-400 bg-opacity-75 py-3.5 px-4 text-left text-base font-bold text-gray-900 backdrop-blur backdrop-filter"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div>{column.render("Header")}</div>
                              {column.canSort && (
                                <div>{column.isSorted ? <SortDescIcon /> : <SortAscIcon />}</div>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ),
                  )}
                </thead>
                {rows.length === 0 ? (
                  <th
                    colSpan={4}
                    className="!w-full text-center font-bold text-4xl py-16"
                    aria-rowspan={4}
                  >
                    No data found
                  </th>
                ) : (
                  <tbody {...getTableBodyProps()} className="bg-white">
                    {rows?.map((row: any, index: number) => {
                      prepareRow(row);
                      return (
                        <CustomRow
                          id={index}
                          row={row}
                          key={index}
                          onClickHandler={onClickHandler}
                        />
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
