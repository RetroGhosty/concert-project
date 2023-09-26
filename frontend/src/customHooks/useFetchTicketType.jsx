import React, { useState, useEffect } from "react";
import axiosTokenIntercept from "../utils/AxiosInterceptor";
import axios from "axios";
import { apiBaseUrl } from "../utils/APIUtils";

const useFetchTicketType = (link, currentTicketTypeActive) => {
  const [data, setData] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [serverResponseCode, setServerResponseCode] = useState(undefined);
  axios.defaults.baseURL = apiBaseUrl;
  useEffect(() => {
    axiosTokenIntercept
      .get(link)
      .then((result) => {
        setData(result.data);
        setServerResponseCode(result.status);
      })
      .catch((err) => {
        setServerResponseCode(err.response.status);
      });

    return () => {
      setIsDataLoaded(true);
    };
  }, [currentTicketTypeActive]);
  return [data, isDataLoaded, serverResponseCode, setData];
};

export default useFetchTicketType;
