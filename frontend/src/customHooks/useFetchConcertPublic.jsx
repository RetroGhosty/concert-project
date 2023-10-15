import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../utils/APIUtils";

const useFetchConcertPublic = (link) => {
  axios.defaults.baseURL = apiBaseUrl;
  const [concert, setConcert] = useState([]);
  const [serverResponseCode, setServerResponseCode] = useState(undefined);
  useEffect(() => {
    let loading = true;
    const fetchData = async () => {
      if (loading) {
        // await axios.get("/api/get/concerts/").then((result) => {
        await axios
          .get(link)
          .then((result) => {
            setConcert(result.data);
            setServerResponseCode(result.status);
          })
          .catch((err) => {
            if (err.response !== undefined){
              setServerResponseCode(err.response.status);
            } else{
              console.log(err)
            }
          });
      }
    };
    fetchData();
    return () => {
      loading = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [concert, serverResponseCode];
};

export default useFetchConcertPublic;
