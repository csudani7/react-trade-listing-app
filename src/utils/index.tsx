export const stocksTableColumns = [
  {
    Header: "Symbol",
    accessor: "Symbol",
  },
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Sector",
    accessor: "Sector",
  },
  {
    Header: "Validtill",
    accessor: "Validtill",
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
