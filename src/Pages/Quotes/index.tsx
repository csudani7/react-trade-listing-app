import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { Table } from "../../components";
import { getQuotes } from "../../services";
import { quotesTableColumns } from "../../utils";
import { CellType } from "../../components/Table/Cell";

// eslint-disable-next-line no-undef
let timer: string | number | NodeJS.Timer | undefined;

const Quotes = () => {
  const [quotesListData, setQuotesListData] = React.useState([]);
  const isUseEffectFired = React.useRef(false);
  const { symbol = "" } = useParams();

  const getQuotesData = () => {
    getQuotes(symbol)
      .then((response) => {
        const quotesData = response?.data?.payload?.[symbol];
        const finalData = quotesData.map(
          (item: { price: number; time: string; valid_till: string }) => {
            return {
              col1: { val: item.price.toFixed(2), type: CellType.Bold },
              col2: { val: item.time, type: CellType.Timestamp },
              col3: { val: item.valid_till, type: CellType.Timestamp },
            };
          },
        );
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
      const timeDiffrence = quotesListData.map((data: { col2: string; col3: string }) =>
        moment(data?.col3)?.diff(new Date(), "seconds"),
      );
      const minSecond = Math.min(...timeDiffrence.filter((item) => item > 0));

      if (minSecond > 0 && minSecond !== Infinity) {
        timer = setTimeout(() => {
          getQuotesData();
        }, minSecond * 1000);
      }
    }

    return () => {
      clearTimeout(timer);
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
