import React from "react";
import clsx from "clsx";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from "react-table";

import { ITable } from "./Table";
import { SortAscIcon, SortDescIcon } from "../../../assets";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

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
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const PAGINATION_BUTTON_CLASS = "border border-black p-1 lg:p-2 rounded-lg";

  React.useEffect(() => {
    setPageSize(5);
  }, []);

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
                {page.length === 0 ? (
                  <th
                    colSpan={4}
                    className="!w-full text-center font-bold text-4xl py-16"
                    aria-rowspan={4}
                  >
                    No data found
                  </th>
                ) : (
                  <tbody {...getTableBodyProps()} className="bg-white">
                    {page?.map((row: any, index: number) => {
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
      <div className="flex justify-center items-center space-x-4 lg:space-x-8 py-12">
        <div className="flex items-center space-x-2 lg:space-x-4">
          <span>Page</span>
          <div className="border border-black px-2 lg:px-3 py-1 rounded-lg">{pageIndex + 1}</div>
          <span>from</span>
          <div className="border border-black px-2 lg:px-3 py-1 rounded-lg">
            {pageOptions.length}
          </div>
        </div>
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={clsx(
              PAGINATION_BUTTON_CLASS,
              canPreviousPage ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-400",
            )}
          >
            <BiFirstPage className="page-controller" />
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={clsx(
              PAGINATION_BUTTON_CLASS,
              canPreviousPage ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-400",
            )}
          >
            <MdKeyboardArrowLeft className="page-controller" />
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={clsx(
              PAGINATION_BUTTON_CLASS,
              canNextPage ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-400",
            )}
          >
            <MdKeyboardArrowRight className="page-controller" />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={clsx(
              PAGINATION_BUTTON_CLASS,
              canNextPage ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-400",
            )}
          >
            <BiLastPage className="page-controller" />
          </button>{" "}
        </div>
        <div className="py-1">
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize !== 15 ? `Show ${pageSize}` : `Show 15`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
