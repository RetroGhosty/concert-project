import React, { useState, useEffect } from "react";
import axiosTokenIntercept from "../utils/AxiosInterceptor";

const useFetchConcertPrivate = (link) => {
  const [concert, setConcert] = useState([]);
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
  }, []);
  return [concert, serverResponseCode, setConcert];
};

export default useFetchConcertPrivate;
