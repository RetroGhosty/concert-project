import React from "react";
import useFetchTicketType from "../customHooks/useFetchTicketType";
import { FaPesoSign } from "react-icons/fa6";
import { format, parse } from "date-fns";
const TicketTypeGuestView = ({ concert_id }) => {
  if (concert_id === undefined) {
    return <>Loading</>;
  }
  const [data, serverResponseCode] = useFetchTicketType(
    `/api/public/typeticket/${concert_id}/`,
    true
  );
  return (
    <>
      {data?.map((ticketType, uid) => (
        <div key={uid} className="col-3 mb-5 ">
          <div className="m-1 p-4 border">
            <h3>{ticketType.name}</h3>
            <div>
              <span className="pe-2">
                {format(
                  parse(ticketType.dateValidRange1, "yyyy-MM-dd", new Date()),
                  "MMM dd"
                )}
              </span>
              -
              <span className="ps-2">
                {format(
                  parse(ticketType.dateValidRange2, "yyyy-MM-dd", new Date()),
                  "MMM dd"
                )}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FaPesoSign className="me-1" />
              {ticketType.price}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TicketTypeGuestView;
