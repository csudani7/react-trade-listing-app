import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { Table } from "../../components";
import { getQuotes } from "../../services";
import { quotesTableColumns } from "../../utils";
import { CellType } from "../../components/Table/Cell";

const Quotes = () => {
  const [quotesListData, setQuotesListData] = React.useState([]);
  const isUseEffectFired = React.useRef(false);
  const { symbol = "" } = useParams();
  /* eslint-disable-next-line */
  let timer: string | number | NodeJS.Timer | undefined;

  const getQuotesData = () => {
    getQuotes(symbol)
      .then((response) => {
        const qData = response?.data?.payload?.[symbol];
        const finalData = qData.map((item: any) => {
          return {
            col1: { val: item.price.toFixed(2), type: CellType.Bold },
            col2: item.time,
            col3: item.valid_till,
          };
        });
        setQuotesListData(finalData);
      })
      .catch(() => {
        setQuotesListData([]);
      });
  };

  React.useEffect(() => {
    if (!isUseEffectFired.current) {
      isUseEffectFired.current = true;
      getQuotesData();
    }
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
    <div className="p-3 bg-gray-100">
      <Table
        data={quotesListData}
        columns={quotesTableColumns}
        allowSorting
        allowPagination
        pageSize={5}
        isSearchable={false}
      />
    </div>
  );
};

export default Quotes;
