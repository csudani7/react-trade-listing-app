import React from "react";

import { Table } from "../../components";
import { getInstruments } from "../../services";
import { stocksTableColumns } from "../../utils";
import { CellType } from "../../components/Table/Cell";

const Stocks = () => {
  const isUseEffectFired = React.useRef(false);
  const [instrumentsList, setInstumentsList] = React.useState<Array<any>>([]);

  const getAllInstrumentsData = () => {
    getInstruments()
      .then((response) => {
        const instrumnetsData = csvToJson(response?.data);
        const finalData = instrumnetsData.map((item) => {
          return {
            col1: {
              label: item.Symbol,
              href: `/quotes/${item.Symbol}`,
              type: CellType.Action,
            },
            col2: item.Name,
            col3: item.Sector,
            col4: item.Validtill,
          };
        });
        setInstumentsList(finalData);
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

  React.useEffect(() => {
    if (!isUseEffectFired.current) {
      isUseEffectFired.current = true;
      getAllInstrumentsData();
    }
  }, []);

  return (
    <div className="p-3 bg-gray-100">
      <Table
        data={instrumentsList}
        columns={stocksTableColumns}
        allowSorting
        allowPagination
        pageSize={5}
        isSearchable={true}
      />
    </div>
  );
};

export default Stocks;
