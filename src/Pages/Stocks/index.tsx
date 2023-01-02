import React from "react";
import { getInstruments } from "../../services";

const Stocks = () => {
  const [instrumentsList, setInstumentsList] = React.useState([]);

  const getAllInstrumentsData = () => {
    getInstruments()
      .then((response: any) => {
        const instrumnetsData = CSVToJSON(response?.data);
        setInstumentsList(instrumnetsData);
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  };

  const CSVToJSON = (data: any, delimiter = ",") => {
    const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
    return data
      .slice(data.indexOf("\n") + 1)
      .split("\n")
      .map((v: any) => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj: any, title: any, index: any) => ((obj[title] = values[index]), obj),
          {},
        );
      });
  };

  React.useEffect(() => {
    getAllInstrumentsData();
  }, []);

  window.console.log(instrumentsList, "instrumentsList");

  return <div>Stocks Page will be here.</div>;
};

export default Stocks;
