import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImTicket } from "react-icons/im";
import {Card, CardContent, CardMedia, CardActionArea} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../utils/APIUtils";
import { dateDifference } from "../utils/DataUtils";

const ConcertsPage = () => {
  const [concert, setConcert] = useState([]);

  const navigate = useNavigate()

  axios.defaults.baseURL = apiBaseUrl

  useEffect(() => {
    let loading = true
    const fetchData = async () => {
      if (loading){
        await axios.get("/api/get/concerts/")
        .then((result) => {
          setConcert(result.data);
        })
      }
    };
    fetchData();
    return () => {
      loading = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="row justify-content-between p-0">
      {concert.map((data) => (
        <Card key={data.id} className="row flex-column col-sm-12 col-lg-6 mb-5 p-0 user-select-none bg-dark text-light concertCard">
          <CardActionArea onClick={() => {navigate(`${data.id}`)}}>
            <CardMedia image={"http://localhost:8000" + data.bannerImg} component="img" height="300" />
            <CardContent className="p-4">
              <div className="col bg-dark text-light px-2">
                <div className="row align-items-start justify-content-between">
                  <div className="col">
                    <h2 className="text-uppercase">{data.name}</h2>
                    <span className="text-info fw-bolder">{dateDifference(data['eventDue'], data['createdAt'])}</span>
                  </div>
                  <div className="col-auto text-end">
                    <h5 className="d-inline p-2"><ImTicket/></h5>
                    <span>{data.ticket.length} / {data.limit}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>

  );
};

export default ConcertsPage;
