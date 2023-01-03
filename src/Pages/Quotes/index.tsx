import React from "react";
import { useParams } from "react-router-dom";

import { Table } from "../../components";
import { getQuotes } from "../../services";
import { quotesTableColumns } from "../../utils";
import { QuotesTableRow } from "./QuotesTableCustomRow";

const Quotes = () => {
  const [quotesListData, setQuotesListData] = React.useState([]);
  const { symbol = "" } = useParams();

  const getQuotesData = () => {
    getQuotes(symbol)
      .then((response: any) => {
        setQuotesListData(response?.data?.payload?.[symbol]);
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  };

  React.useEffect(() => {
    getQuotesData();
  }, []);

  return (
    <Table
      data={quotesListData}
      columns={quotesTableColumns}
      customRow={QuotesTableRow}
      isGlobalFilter={false}
    />
  );
};

export default Quotes;
