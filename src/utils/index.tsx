export const stocksTableColumns = [
  {
    Header: "Symbol",
    accessor: "symbol",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Sector",
    accessor: "sector",
  },
  {
    Header: "Validtill",
    accessor: "validtill",
  },
];

export const quotesTableColumns = [
  {
    Header: "Time",
    accessor: "time",
  },
  {
    Header: "Price",
    accessor: "price",
    disableSortBy: true,
  },
  {
    Header: "Valid Till",
    accessor: "valid_till",
    disableSortBy: true,
  },
];
