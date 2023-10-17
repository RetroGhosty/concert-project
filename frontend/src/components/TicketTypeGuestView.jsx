import React, { useState } from "react";
import useFetchTicketType from "../customHooks/useFetchTicketType";
import { FaPesoSign } from "react-icons/fa6";
import { format, parse } from "date-fns";
import { animate, motion } from "framer-motion";
import PayTicketModals from "./modals/PayTicketModals";

const TicketTypeGuestView = ({ concert_id }) => {
  const [payTicketModalState, setPayTicketModalState] = useState(false);
  const [currentTicketState, setCurrentTicketState] = useState(null);

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

  const setTicketInfoModal = (dataparam, isAvailableParam) => {
    if (isAvailableParam !== false) {
      setCurrentTicketState(dataparam);
      setPayTicketModalState(true);
    }
  };

  return (
    <>
      {data?.map((ticketType, uid) => (
        <div
          key={uid}
          onClick={() => setTicketInfoModal(ticketType, ticketType.isAvailable)}
          className="col-12 p-0 col-lg-6 mb-5"
        >
          <motion.div
            initial={
              !ticketType.isAvailable
                ? { backgroundColor: "#343434" }
                : { backgroundColor: "#111111" }
            }
            whileHover={!ticketType.isAvailable ? null : { scale: 1.03 }}
            className="p-4 m-3 rounded user-select-none"
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
      <PayTicketModals
        show={payTicketModalState}
        onHide={() => {
          setPayTicketModalState(false);
        }}
        ticketInfo={currentTicketState}
      />
    </>
  );
};

export default TicketTypeGuestView;
