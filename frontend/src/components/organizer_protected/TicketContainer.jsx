import React, { useContext, useEffect, useState } from "react";
import { PurpleButton } from "../CustomizedMaterials";

import useFetchTicketType from "../../customHooks/useFetchTicketType";
import TicketTable from "./TicketTable";
import CreateTicketTypeModals from "../modals/CreateTicketTypeModals";
import { format, parse } from "date-fns";
import { FaPesoSign } from "react-icons/fa6";
import EditTicketTypeModals from "../modals/EditTicketTypeModals";
import TicketContext from "../../context/TicketContext";
import CreateTicketModals from "../modals/CreateTicketModals";

const TicketContainer = ({ id, dateMin, dateMax }) => {
  const [data, serverResponseCode] = useFetchTicketType(
    `/api/typeticket/${id}`
  );
  const [currentTicketTypeActive, setCurrentTicketTypeActive] = useState(0);

  const [modalCreateTicketType, setModalCreateTicketType] = useState(false);
  const [modalEditTicketType, setModalEditTicketType] = useState(false);

  const [modalGenerateTickets, setModalGenerateTickets] = useState(false);

  const { ticketTypeInfo, setTicketTypeInfo } = useContext(TicketContext);

  const dateValidityConvert = (startDate, endDate) => {
    const parseStartDate = parse(startDate, "yyyy-dd-MM", new Date());
    const parseEndDate = parse(endDate, "yyyy-dd-MM", new Date());
    return (
      <div>{`${format(parseStartDate, "MMM dd")} - ${format(
        parseEndDate,
        "MMM dd"
      )}`}</div>
    );
  };

  useEffect(() => {
    if (data !== undefined) {
      setTicketTypeInfo(data[currentTicketTypeActive]);
    }
  }, [currentTicketTypeActive, data, ticketTypeInfo]);

  if (serverResponseCode !== 200) {
    return (
      <>
        <div className="border-top border-info p-3">
          <div className="col-12 mb-3">
            <PurpleButton
              onClick={() => setModalCreateTicketType(true)}
              className="p-2 me-3"
            >
              Create ticket type
            </PurpleButton>
          </div>
          Create your first ticket type!
        </div>
        <CreateTicketTypeModals
          show={modalCreateTicketType}
          onHide={() => setModalCreateTicketType(false)}
          concert_id={id}
        />
      </>
    );
  }
  return (
    <>
      <div className="border-top border-info p-3">
        <div className="col-12 mb-3">
          <PurpleButton
            onClick={() => setModalCreateTicketType(true)}
            className="p-2 me-3"
          >
            Create ticket type
          </PurpleButton>
          <PurpleButton
            className="p-2"
            onClick={() => setModalEditTicketType(true)}
          >
            EDIT TICKET TYPE
          </PurpleButton>
        </div>
        <div className="ticketContainer row p-0 m-0">
          <div className="col-3 ticketType p-0 py-5">
            <ul className="justify-content-start">
              {data.map((item, item_id) => (
                <li
                  className={
                    currentTicketTypeActive === item_id ? "mb-2 active" : "mb-2"
                  }
                  key={item_id}
                  onClick={() => {
                    setCurrentTicketTypeActive(item_id);
                  }}
                >
                  <span>{item.name}</span>
                  {dateValidityConvert(
                    item.dateValidRange1,
                    item.dateValidRange2
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col ticketInfoContainer p-0 ps-4 py-5">
            <div className="d-flex align-items-center justify-content-between me-3 mb-4">
              <PurpleButton onClick={() => setModalGenerateTickets(true)}>
                Generate tickets
              </PurpleButton>
              <span className="px-3 py-2 rounded bg-primary d-flex align-items-center justify-content-between">
                <FaPesoSign className="me-2" />
                {data[currentTicketTypeActive]?.price}
              </span>
            </div>

            <TicketTable
              ticketTypeID={data[currentTicketTypeActive]?.id}
              currentTicketTypeActive={currentTicketTypeActive}
            />
          </div>
        </div>
      </div>
      <CreateTicketTypeModals
        show={modalCreateTicketType}
        onHide={() => setModalCreateTicketType(false)}
        concert_id={id}
      />
      <EditTicketTypeModals
        show={modalEditTicketType}
        onHide={() => setModalEditTicketType(false)}
        concert_id={id}
      />
      <CreateTicketModals
        show={modalGenerateTickets}
        onHide={() => setModalGenerateTickets(false)}
        currentTicketType={data[currentTicketTypeActive]?.id}
      />
    </>
  );
};

export default TicketContainer;
