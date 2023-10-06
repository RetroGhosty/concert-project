import React, { useState, useEffect, useContext } from "react";
import axiosTokenIntercept from "../utils/AxiosInterceptor";
import axios from "axios";
import { apiBaseUrl } from "../utils/APIUtils";
import TicketContext from "../context/TicketContext";

const useFetchTicketType = (link, currentTicketTypeActive) => {
  const { ticketTypeList, setTicketTypeList, isModified, setIsModified } =
    useContext(TicketContext);
  const [data, setData] = useState();
  const [serverResponseCode, setServerResponseCode] = useState(undefined);
  axios.defaults.baseURL = apiBaseUrl;

  useEffect(() => {
    axiosTokenIntercept
      .get(link)
      .then((result) => {
        setData(result.data);
        setTicketTypeList(result.data);
        setServerResponseCode(result.status);
      })
      .catch((err) => {
        setServerResponseCode(err.response.status);
      });
    return () => {
      setIsModified(false);
    };
  }, [currentTicketTypeActive, isModified]);

  return [data, serverResponseCode];
};

export default useFetchTicketType;
