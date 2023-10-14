import React, { useEffect, useState } from "react";

import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiStaticURL, mediaBaseUrl } from "../utils/APIUtils";
import useFetchConcertPublic from "../customHooks/useFetchConcertPublic";
import NotFound from "./NotFound";
import { format } from "date-fns";

const ConcertsPage = () => {
  const navigate = useNavigate();
  const [concert, serverResponseCode] =
    useFetchConcertPublic("/api/get/concerts/");

  if (serverResponseCode !== 200) {
    return <NotFound />;
  }
  return (
    <div className="row justify-content-between p-0">
      {concert.map((data) => (
        <Card
          key={data.id}
          className="row flex-column col-sm-12 col-lg-6 mb-5 p-0 user-select-none bg-dark text-light concertCard"
        >
          <CardActionArea
            onClick={() => {
              navigate(`${data.id}`);
            }}
          >
            <CardMedia
              image={mediaBaseUrl + apiStaticURL + data.bannerImg}
              component="img"
              height="300"
            />
            <CardContent className="p-4">
              <div className="col text-light px-2">
                <div className="row align-items-start justify-content-between">
                  <div className="col">
                    <h2 className="text-uppercase">{data.name}</h2>
                    <span className="text-info fw-bolder">
                      {`${format(new Date(data["dateValidRange1"]), "MMM dd")} 
                      - 
                      ${format(new Date(data["dateValidRange2"]), "MMM dd")}`}
                    </span>
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
