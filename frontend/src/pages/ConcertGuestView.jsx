import { React, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

import { Card, CardMedia, CardContent } from "@mui/material";
import { apiStaticURL, mediaBaseUrl } from "../utils/APIUtils";
import useFetchConcertPublic from "../customHooks/useFetchConcertPublic";
import TicketTypeGuestView from "../components/TicketTypeGuestView";
import { format } from "date-fns";
import TicketContext from "../context/TicketContext";

const ConcertGuestView = () => {
  let { concertID } = useParams();

  const [concert, serverResponseCode] = useFetchConcertPublic(
    `/api/public/concert/${concertID}/`
  );

  const { concertTicketPublicState, setConcertTicketPublicState } =
    useContext(TicketContext);

  useEffect(() => {
    if (
      concertTicketPublicState === undefined ||
      concertTicketPublicState === null
    ) {
      setConcertTicketPublicState(concert);
    }
  }, [concert]);

  if (serverResponseCode !== 200) {
    return <NotFound />;
  }

  return (
    <>
      <div className="row justify-content-between align-items-start mb-5">
        <Card className="col text-light p-0">
          <CardMedia
            component="img"
            image={`${mediaBaseUrl}${apiStaticURL}${concert["bannerImg"]}`}
            height="400"
          />
          <CardContent>
            <div className="row p-4">
              <div className="col-12 col-lg-7">
                <div className="mb-4">
                  <h2 className="mb-2">{concert["name"]}</h2>
                  <p>{concert["paragraph"]}</p>
                </div>
              </div>
              <div className="col">
                <div className="mb-4">
                  <h5 className="mb-3">Concert Duration</h5>
                  <div>
                    <span className="bg-info rounded p-2 me-2 text-dark">
                      {format(
                        new Date(concert["dateValidRange1"]),
                        "MMMM dd, yyyy"
                      )}
                    </span>
                    <span className="me-2">to</span>
                    <span className="bg-info rounded p-2 me-2 text-dark">
                      {format(
                        new Date(concert["dateValidRange2"]),
                        "MMMM dd, yyyy"
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">Event held at</h5>
                  {`${concert["address"]}, ${concert["city"]}, ${concert["province"]}, ${concert["postal"]}`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="row bg-dark text-light p-5 rounded">
        <h2 className="mb-4 p-0 fw-semibold">Tickets</h2>
        <TicketTypeGuestView concert_id={concert.id} />
      </div>
    </>
  );
};

export default ConcertGuestView;
