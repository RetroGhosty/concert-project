import { React, useContext, useEffect, useState } from "react";
import { ImTicket } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";
import { PurpleButton } from "../components/CustomizedMaterials";

import { Card, CardMedia, CardContent } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { apiBaseUrl, apiStaticURL, mediaBaseUrl } from "../utils/APIUtils";
import useFetchConcertPublic from "../customHooks/useFetchConcertPublic";
import TicketTypeGuestView from "../components/TicketTypeGuestView";

const ConcertGuestView = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let { concertID } = useParams();
  const [concert, serverResponseCode] = useFetchConcertPublic(
    `/api/public/concert/${concertID}/`
  );

  const IDUserState = () => {
    if (user === undefined) {
      navigate("/login");
    }
  };

  if (serverResponseCode !== 200) {
    return <NotFound />;
  }

  return (
    <>
      <div className="row justify-content-between align-items-start mb-5">
        <Card className="col-lg-8 text-light p-0">
          <CardMedia
            component="img"
            image={`${mediaBaseUrl}${apiStaticURL}${concert["bannerImg"]}`}
            height="400"
          />
          <CardContent className="m-3">
            <h1 className="mb-4">{concert["name"]}</h1>
            <p>{concert["paragraph"]}</p>
          </CardContent>
        </Card>
        <div className="col-lg-3 bg-dark text-dark p-0 rounded">
          <div className="text-light p-4">
            <h4>Ticket Remaining</h4>

            <h3 className="d-inline pe-2">
              <ImTicket />
            </h3>
            <div className="mt-3">
              <PurpleButton
                variant="contained"
                className="px-4"
                onClick={IDUserState}
              >
                Join concert
              </PurpleButton>
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-dark text-light p-5 rounded">
        <h2 className="mb-4 p-0 fw-semibold">Tickets</h2>
        <TicketTypeGuestView concert_id={concert.id} />
      </div>
    </>
  );
};

export default ConcertGuestView;
