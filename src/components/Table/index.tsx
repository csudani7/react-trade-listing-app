import React from "react";
import DesktopTable from "./DesktopTable";

interface TableProps {
  data: Array<any>;
  columns: Array<any>;
  allowSorting?: boolean;
  allowPagination?: boolean;
  isSearchable?: boolean;
  isTableHeaderNoWrap?: boolean;
  className?: string;
  getTextAlignment?: (index: number) => "left" | "center" | "right";
  pageSize?: number;
  mobileScrollShadowHeight?: string;
}

function Table({
  data,
  columns,
  allowSorting = false,
  allowPagination = false,
  isTableHeaderNoWrap = true,
  isSearchable = false,
  className,
  getTextAlignment,
  pageSize = 9,
  mobileScrollShadowHeight,
}: TableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = React.useMemo(() => {
    return data.filter((value) => {
      return (
        value?.col1?.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        value?.col2?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        value?.col3?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, data]);

  return (
    <DesktopTable
      data={filteredData}
      columns={columns}
      allowSorting={allowSorting}
      allowPagination={allowPagination}
      isTableHeaderNoWrap={isTableHeaderNoWrap}
      className={className}
      getTextAlignment={getTextAlignment}
      pageSize={pageSize}
      isSearchable={isSearchable}
      handleChange={handleChange}
      mobileScrollShadowHeight={mobileScrollShadowHeight}
    />
  );
}

export default Table;
