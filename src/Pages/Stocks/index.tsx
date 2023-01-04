import React from "react";
import csv from "csvtojson";

import { Table } from "../../components";
import { getInstruments } from "../../services";
import { stocksTableColumns } from "../../utils";
import { CellType } from "../../components/Table/Cell";

interface InstrumentsTypes {
  col1: { label: string; href: string; type: CellType };
  col2: string;
  col3: string;
  col4: { val: string; type: CellType };
}

const Stocks = () => {
  const isUseEffectFired = React.useRef(false);
  const [instrumentsList, setInstumentsList] = React.useState<Array<InstrumentsTypes>>([]);

  const getAllInstrumentsData = () => {
    getInstruments()
      .then((response) => {
        csv({
          noheader: false,
          output: "json",
        })
          .fromString(response?.data)
          .then((csvRow: any) => {
            const finalData = csvRow.map(
              (item: { Symbol: string; Name: string; Sector: string; Validtill: any }) => {
                return {
                  col1: {
                    label: item.Symbol !== "" ? item.Symbol : "N/A",
                    href: `/quotes/${item.Symbol}`,
                    type: CellType.Action,
                  },
                  col2: item.Name !== "" ? item.Name : "N/A",
                  col3: item.Sector !== "" ? item.Sector : "N/A",
                  col4: { val: item.Validtill, type: CellType.Timestamp },
                };
              },
            );
            setInstumentsList(finalData);
          });
      })
      .catch(() => {
        setInstumentsList([]);
      });
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
