import { Axios } from "./axios";

export const getInstruments = async () => {
  return await Axios.get(`/instuments`);
};

export const getQuotes = async (symbol: string) => {
  return await Axios.get(`/quotes/${symbol}`);
};
