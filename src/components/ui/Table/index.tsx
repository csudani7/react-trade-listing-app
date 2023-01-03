import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import React from "react";
import { ITable } from "./Table";

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

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div>
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full divide-y divide-gray-300 border-spacing-0"
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
                            className="sticky top-0 z-10 border-b border-gray-300 bg-gray-400 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-base font-bold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div>{column.render("Header")}</div>
                              {column.canSort && <div>{column.isSorted ? "🔼" : "🔽"}</div>}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ),
                  )}
                  {isGlobalFilter && (
                    <tr>
                      <th
                        colSpan={visibleColumns.length}
                        className="py-4 text-left sm:pl-6 lg:pl-8"
                      >
                        <GlobalFilter
                          preGlobalFilteredRows={preGlobalFilteredRows}
                          globalFilter={state.globalFilter}
                          setGlobalFilter={setGlobalFilter}
                        />
                      </th>
                    </tr>
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
