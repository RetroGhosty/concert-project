import React, { useEffect, useState } from "react";

import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiStaticURL, mediaBaseUrl } from "../utils/APIUtils";
import useFetchConcertPublic from "../customHooks/useFetchConcertPublic";
import NotFound from "./NotFound";
import { format, parse, compareAsc } from "date-fns";

const ConcertsPage = () => {
  const navigate = useNavigate();
  const [concert, serverResponseCode] =
    useFetchConcertPublic("/api/get/concerts/");

  if (serverResponseCode !== 200) {
    return <NotFound />;
  }

  const isConcertExpired = (dateLeft) => {
    const parseDateLeft = parse(dateLeft, "yyyy-MM-dd", new Date());
    if (compareAsc(parseDateLeft, new Date()) === 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="row justify-content-between">
        {concert.map((data) => (
          <>
            {isConcertExpired(data["dateValidRange2"]) ? (
              <div className="col user-select-none concertCard">
                <Card key={data.id}>
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
                    <CardContent>
                      <div className="col text-light px-2">
                        <div className="row align-items-start justify-content-between">
                          <div className="col">
                            <h2 className="text-uppercase">{data.name}</h2>
                            <span className="text-info fw-bolder">
                              {`${format(
                                new Date(data["dateValidRange1"]),
                                "MMM dd"
                              )} 
                          - 
                          ${format(
                            new Date(data["dateValidRange2"]),
                            "MMM dd"
                          )}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </>
  );
};

export default ConcertsPage;
