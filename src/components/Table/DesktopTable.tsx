import clsx from "clsx";
import React from "react";
import {
  HeaderGroup,
  PluginHook,
  Row,
  usePagination,
  useSortBy,
  UseSortByColumnProps,
  useTable,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { ArrowIcon } from "../../assets/icons";
import Cell from "./Cell";
import Pagination from "./Pagination";
import TextField from "../Textfield/TextField";

interface TableProps {
  data: Array<any>;
  columns: Array<any>;
  allowSorting?: boolean;
  allowPagination?: boolean;
  isTableHeaderNoWrap?: boolean;
  className?: string;
  getTextAlignment?: (index: number) => "left" | "center" | "right";
  pageSize?: number;
  mobileScrollShadowHeight?: string;
  handleChange: any;
  isSearchable: boolean;
}

function Table({
  data: _data,
  columns: _columns,
  allowSorting = false,
  allowPagination = false,
  isTableHeaderNoWrap = true,
  className,
  getTextAlignment,
  pageSize = 9,
  mobileScrollShadowHeight,
  handleChange,
  isSearchable,
}: TableProps) {
  // Use useMemo to store data and columns to prevent re-rendering
  const ref = React.useRef<HTMLDivElement>(null);
  const [isLeftScrollable, setIsLeftScrollable] = React.useState(false);
  const [isRightScrollable, setIsRightScrollable] = React.useState(false);

  const data: Array<any> = React.useMemo(() => _data || [], [_data]);
  const columns: Array<any> = React.useMemo(() => _columns || [], [_columns]);
  const plugins: PluginHook<any>[] = React.useMemo(() => {
    const plugins: PluginHook<any>[] = [];
    if (allowSorting) plugins.push(useSortBy);
    if (allowPagination) plugins.push(usePagination);
    return plugins;
  }, [allowSorting, allowPagination]);

  const { width } = useWindowDimensions();

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 400,
      maxWidth: 600,
    }),
    [],
  );

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (ref && ref.current) {
        const { offsetWidth, scrollWidth, scrollLeft } = ref.current;
        if (scrollWidth > offsetWidth) {
          if (scrollLeft <= 5) {
            setIsLeftScrollable(false);
          } else {
            setIsLeftScrollable(true);
          }
          if (offsetWidth + scrollLeft >= scrollWidth - 5) {
            setIsRightScrollable(false);
          } else {
            setIsRightScrollable(true);
          }
        } else {
          setIsLeftScrollable(false);
          setIsRightScrollable(false);
        }
      }
    };
    if (ref && ref.current && width) {
      handleScroll();
      ref.current.addEventListener("scroll", handleScroll);
      return () => {
        if (ref && ref.current) ref.current.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref, width]);

  const tableProps = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageSize },
      autoResetSortBy: false,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    ...plugins,
  );
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } = tableProps;

  const rows: Row<any>[] = allowPagination ? (tableProps as any).page : tableProps.rows;

  return (
    <div className={clsx("relative max-w-full", className)}>
      {isRightScrollable && (
        <div
          className="absolute top-0 right-0 z-10 w-8 h-full bg-gradient-to-r from-transparent to-gray-300"
          style={{ height: mobileScrollShadowHeight || "100%" }}
        />
      )}
      {isLeftScrollable && (
        <div className="absolute top-0 left-0 z-10 w-8 h-full bg-gradient-to-r from-gray-300 to-transparent" />
      )}
      <div className="relative block w-full overflow-x-auto" ref={ref}>
        {isSearchable && (
          <TextField
            className="mb-5"
            name="username"
            placeholder="Search here..."
            onChange={handleChange}
          />
        )}
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`thead-tr-${headerGroupIndex}`}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const textAlignment = getTextAlignment
                    ? getTextAlignment(columnIndex)
                    : columnIndex < 2
                    ? "left"
                    : "right";
                  if (allowSorting) {
                    const _column = column as UseSortByColumnProps<any> & HeaderGroup<any>;
                    const tableHeaderProps = _column.getHeaderProps(_column.getSortByToggleProps());
                    const isSorted = _column.isSorted;
                    const isSortedDesc = _column.isSortedDesc;

                    return (
                      <th
                        {...tableHeaderProps}
                        className={clsx(
                          "bg-gray-100 font-medium text-sm text-gray-900 py-4 px-4",
                          textAlignment === "left" && "text-left",
                          textAlignment === "center" && "text-center",
                          textAlignment === "right" && "text-right",
                          isTableHeaderNoWrap && "whitespace-nowrap",
                        )}
                        key={`thead-tr-th-${columnIndex}`}
                      >
                        <div
                          className={clsx(
                            "flex items-center",
                            textAlignment === "center" && "justify-center",
                            textAlignment === "right" && "justify-end",
                          )}
                        >
                          {column.render("Header")}
                          {allowSorting && (
                            <div>
                              {isSorted ? (
                                isSortedDesc ? (
                                  <ArrowIcon fillColor="#05adbb" />
                                ) : (
                                  <ArrowIcon fillColor="#636672" rotateDegree={180} />
                                )
                              ) : (
                                <ArrowIcon fillColor="#bcc0c8" />
                              )}
                            </div>
                          )}
                          <div
                            {...(column as any).getResizerProps()}
                            className={clsx(
                              "resizer w-0.5 bg-[#0f191a] h-1/2 inline-block absolute right-0 top-1/4 translate-x-2/4",
                            )}
                          />
                        </div>
                      </th>
                    );
                  }
                  return (
                    <th
                      {...column.getHeaderProps()}
                      className={clsx(
                        "bg-gray-100 font-medium text-sm text-gray-900 py-4 px-4 whitespace-nowrap",
                        textAlignment === "left" && "text-left",
                        textAlignment === "center" && "text-center",
                        textAlignment === "right" && "text-right",
                      )}
                      key={`thead-tr-th-${columnIndex}`}
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={`tbody-tr-${rowIndex}`}
                  className="border-t border-gray-200 border-solid"
                >
                  {row.cells.map((cell, cellIndex) => {
                    const textAlignment = getTextAlignment
                      ? getTextAlignment(cellIndex)
                      : cellIndex < 2
                      ? "left"
                      : "right";

                    return (
                      <Cell
                        key={`tbody-tr-td-${cellIndex}`}
                        cell={cell}
                        className={clsx(
                          textAlignment === "left" && "text-left",
                          textAlignment === "center" && "text-center",
                          textAlignment === "right" && "text-right",
                        )}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {allowPagination && <Pagination tableProps={tableProps} className="mt-8" />}
    </div>
  );
}

export default Table;
