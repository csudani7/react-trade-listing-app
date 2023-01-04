import React from "react";
import clsx from "clsx";
import { TableInstance } from "react-table";

import { ArrowOutlineIcon } from "../../assets/icons";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const boundaryCount = 1;
const siblingCount = 1;

interface Props {
  tableProps: TableInstance<any>;
  className?: string;
}

// The pagaination logic is referred to Material UI Pagination (https://github.com/mui-org/material-ui/blob/48bf11343f04db242b69a0a8ceef3c67ac41de4a/packages/material-ui-lab/src/Pagination/usePagination.js)
export default function Pagination({ tableProps, className }: Props) {
  const {
    state: { pageIndex },
    previousPage,
    nextPage,
    gotoPage,
    pageCount,
  } = tableProps as any;
  if (pageCount === 1) return <></>;

  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);
  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      pageIndex - siblingCount,
      // Lower boundary when page is high
      pageCount - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      pageIndex + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages[0] - 2,
  );
  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    "previous",
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < pageCount - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < pageCount - boundaryCount - 1
      ? ["end-ellipsis"]
      : pageCount - boundaryCount > boundaryCount
      ? [pageCount - boundaryCount]
      : []),

    ...endPages,
    "next",
  ];

  return (
    <div
      className={clsx(
        "text-sm font-medium leading-normal tracking-widest text-gray-900 flex items-center justify-center",
        className,
      )}
    >
      {itemList.map((p: string | number) => {
        if (p === "previous") {
          return (
            <button
              key={p}
              type="button"
              className="flex mx-2 bg-transparent border-0 focus:outline-none"
              onClick={previousPage}
              disabled={pageIndex === 0}
            >
              <ArrowOutlineIcon rotateDegree={180} />
            </button>
          );
        } else if (p === "next") {
          return (
            <button
              key={p}
              type="button"
              className="flex mx-2 bg-transparent border-0 focus:outline-none"
              onClick={nextPage}
              disabled={pageIndex === pageCount - 1}
            >
              <ArrowOutlineIcon />
            </button>
          );
        } else if (p === "start-ellipsis" || p === "end-ellipsis") {
          return (
            <span key={p} className="mx-2 text-gray-300">
              ...
            </span>
          );
        }
        return (
          <button
            type="button"
            key={p}
            className={clsx(
              "mx-2 border-0 focus:outline-none bg-transparent",
              pageIndex + 1 === p && "text-gray-300",
            )}
            onClick={() => gotoPage((p as number) - 1)}
            disabled={pageIndex + 1 === p}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
