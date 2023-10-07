import React, { useState, useEffect, useContext } from "react";
import axiosTokenIntercept from "../utils/AxiosInterceptor";
import axios from "axios";
import { apiBaseUrl } from "../utils/APIUtils";
import TicketContext from "../context/TicketContext";

const useFetchTicketType = (link, isPublic, currentTicketTypeActive) => {
  const { ticketTypeList, setTicketTypeList, isModified, setIsModified } =
    useContext(TicketContext);
  const [data, setData] = useState();
  const [serverResponseCode, setServerResponseCode] = useState(undefined);
  axios.defaults.baseURL = apiBaseUrl;

  useEffect(() => {
    if (isPublic != true) {
      axiosTokenIntercept
        .get(link)
        .then((result) => {
          setData(result.data);
          setTicketTypeList(result.data);
          setServerResponseCode(result.status);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status !== undefined) {
            setServerResponseCode(err.response.status);
          }
        });
    } else {
      axios
        .get(link)
        .then((result) => {
          setData(result.data);
          setTicketTypeList(result.data);
          setServerResponseCode(result.status);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status !== undefined) {
            setServerResponseCode(err.response.status);
          }
        });
    }
    return () => {
      setIsModified(false);
    };
  }, [currentTicketTypeActive, isModified]);

  return [data, serverResponseCode];
};

export default useFetchTicketType;
