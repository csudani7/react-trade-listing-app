import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { Table } from "../../components";
import { getQuotes } from "../../services";
import { quotesTableColumns } from "../../utils";
import { QuotesTableRow } from "./QuotesTableCustomRow";

const Quotes = () => {
  const [quotesListData, setQuotesListData] = React.useState([]);
  const { symbol = "" } = useParams();
  let timer: string | number | NodeJS.Timer | undefined;

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

  React.useEffect(() => {
    if (quotesListData?.length > 0) {
      timer = setInterval(() => {
        const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const isAnyValidTillExpire = quotesListData
          .map((data: any) => moment(data?.valid_till)?.diff(currentDate, "minutes"))
          .some((minutes) => minutes < 0);

        if (isAnyValidTillExpire) {
          getQuotesData();
        }
      }, 60000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [quotesListData]);

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
