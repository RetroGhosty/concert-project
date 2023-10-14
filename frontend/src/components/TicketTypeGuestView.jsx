import React from "react";
import useFetchTicketType from "../customHooks/useFetchTicketType";
import { FaPesoSign } from "react-icons/fa6";
import { format, parse } from "date-fns";
import { animate, motion } from "framer-motion";

const TicketTypeGuestView = ({ concert_id }) => {
  if (concert_id === undefined) {
    return <>Loading</>;
  }
  const [data, serverResponseCode] = useFetchTicketType(
    `/api/public/typeticket/${concert_id}/`,
    true
  );

  if (data === undefined) {
    return <>No tickets available</>;
  }

  return (
    <>
      {data?.map((ticketType, uid) => (
        <div key={uid} className="col-12 p-0 col-lg-6 mb-5">
          <motion.div
            initial={
              !ticketType.isAvailable
                ? { backgroundColor: "#343434" }
                : { backgroundColor: "#111111" }
            }
            whileHover={!ticketType.isAvailable ? null : { scale: 1.05 }}
            className="p-4 rounded user-select-none"
          >
            <b>
              {ticketType.name} {!ticketType.isAvailable ? "[Sold out]" : null}{" "}
            </b>
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
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default TicketTypeGuestView;
