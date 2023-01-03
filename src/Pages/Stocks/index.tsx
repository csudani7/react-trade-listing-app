import React from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "../../components";
import { getInstruments } from "../../services";
import { stocksTableColumns } from "../../utils";
import { StocksTableRow } from "./CustomRow";

const Stocks = () => {
  const [instrumentsList, setInstumentsList] = React.useState<Array<IStocksProps.stocksData>>([]);
  const navigate = useNavigate();

  const getAllInstrumentsData = () => {
    getInstruments()
      .then((response) => {
        const instrumnetsData = csvToJson(response?.data);
        setInstumentsList(instrumnetsData);
      })
      .catch(() => {
        setInstumentsList([]);
      });
  };

  const csvToJson = (data: string, delimiter = ",") => {
    const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
    const convertedData = data
      .slice(data.indexOf("\n") + 1)
      .split("\n")
      .map((v: string) => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj: any, title: string, index: number) => ((obj[title] = values[index]), obj),
          {},
        );
      });

    return convertedData;
  };

  const handleOnclickOfCustomRow = (symbol: string) => {
    navigate(`/quotes/${symbol}`);
  };

  React.useEffect(() => {
    getAllInstrumentsData();
  }, []);

  return (
    <Table
      data={instrumentsList}
      columns={stocksTableColumns}
      customRow={StocksTableRow}
      onClickHandler={handleOnclickOfCustomRow}
    />
  );
};

export default Stocks;
