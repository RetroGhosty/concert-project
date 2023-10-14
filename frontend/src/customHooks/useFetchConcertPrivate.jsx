import React, { useState, useEffect, useContext } from "react";
import axiosTokenIntercept from "../utils/AxiosInterceptor";
import TicketContext from "../context/TicketContext";

const useFetchConcertPrivate = (link) => {
  const [concert, setConcert] = useState([]);
  const { isModified } = useContext(TicketContext);
  const [serverResponseCode, setServerResponseCode] = useState(undefined);
  useEffect(() => {
    let loading = true;
    const fetchData = async () => {
      if (loading) {
        await axiosTokenIntercept
          .get(link)
          .then((result) => {
            setConcert(result.data);
            setServerResponseCode(result.status);
          })
          .catch((err) => {
            setServerResponseCode(err.response.status);
          });
      }
    };
    fetchData();
    return () => {
      loading = false;
    };
  }, [isModified]);
  return [concert, serverResponseCode, setConcert];
};

export default useFetchConcertPrivate;
