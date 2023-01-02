//Global Imports
import axios from "axios";
//End Global Imports

const baseAPIUrl = process.env.REACT_APP_BASE_ID;

export const Axios = axios.create({
  baseURL: baseAPIUrl,
});
