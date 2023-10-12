import React, { useContext, useEffect, useState } from "react";
import { PurpleButton, RedButton } from "../CustomizedMaterials";

import useFetchTicketType from "../../customHooks/useFetchTicketType";
import TicketTable from "./TicketTable";
import CreateTicketTypeModals from "../modals/CreateTicketTypeModals";
import { format, parse } from "date-fns";
import { FaPesoSign } from "react-icons/fa6";
import EditTicketTypeModals from "../modals/EditTicketTypeModals";
import TicketContext from "../../context/TicketContext";
import CreateTicketModals from "../modals/CreateTicketModals";
import DeleteTicketTypeModals from "../modals/DeleteTicketTypeModals";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";

const TicketContainer = ({ id, dateMin, dateMax }) => {
  const [responseData, serverResponseCode] = useFetchTicketType(
    `/api/typeticket/${id}/`,
    false
  );
  const [currentTicketTypeActive, setCurrentTicketTypeActive] = useState(0);

  const [modalCreateTicketType, setModalCreateTicketType] = useState(false);
  const [modalEditTicketType, setModalEditTicketType] = useState(false);
  const [modalDeleteTicketType, setModalDeleteTicketType] = useState(false);
  const [modalGenerateTickets, setModalGenerateTickets] = useState(false);

  const {
    ticketTypeInfo,
    setTicketTypeInfo,
    selectedTickets,
    setSelectedTickets,
    setIsModified,
  } = useContext(TicketContext);

  const changeCurrentTicketTypeState = (item_id) => {
    setCurrentTicketTypeActive(item_id);
    setSelectedTickets([]);
  };

  const dateValidityConvert = (startDate, endDate) => {
    const parseStartDate = parse(startDate, "yyyy-MM-dd", new Date());
    const parseEndDate = parse(endDate, "yyyy-MM-dd", new Date());
    return (
      <div>{`${format(parseStartDate, "MMM dd")} - ${format(
        parseEndDate,
        "MMM dd"
      )}`}</div>
    );
  };

  const deleteSelectedTicket = (ticketSelectedArr) => {
    const ticketIdArr = [];
    for (let i = 0; i < ticketSelectedArr.length; i++) {
      ticketIdArr.push(ticketSelectedArr[i].id);
    }

    const payload = {
      ticketIdList: ticketIdArr,
    };

    axiosTokenIntercept
      .delete(`/api/ticket/${responseData[currentTicketTypeActive].id}`, {
        data: payload,
      })
      .then((response) => {
        setIsModified(true);
        setSelectedTickets([]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const isTicketSelectedExistBtn = (ticketSelectedArr) => {
    if (ticketSelectedArr.length !== 0) {
      return (
        <>
          <RedButton
            className="me-2"
            onClick={() => deleteSelectedTicket(ticketSelectedArr)}
          >
            Delete
          </RedButton>
          <span>Selected [ {ticketSelectedArr.length} ] tickets</span>
        </>
      );
    } else {
      return <>No ticket selected</>;
    }
  };

  useEffect(() => {
    if (responseData !== undefined) {
      setTicketTypeInfo(responseData[currentTicketTypeActive]);
    }
  }, [currentTicketTypeActive, responseData, ticketTypeInfo]);

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
            className="p-2 me-3"
            onClick={() => setModalEditTicketType(true)}
          >
            EDIT TICKET TYPE
          </PurpleButton>
          <RedButton
            className="p-2"
            onClick={() => setModalDeleteTicketType(true)}
          >
            Delete Ticket Type
          </RedButton>
        </div>
        <div className="ticketContainer row p-0 m-0">
          <div className="col-3 ticketType p-0 py-5">
            <ul className="justify-content-start">
              {responseData.map((item, item_id) => (
                <li
                  className={
                    currentTicketTypeActive === item_id ? "mb-2 active" : "mb-2"
                  }
                  key={item_id}
                  onClick={() => {
                    changeCurrentTicketTypeState(item_id);
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
              <span>
                <PurpleButton
                  className="me-2"
                  onClick={() => setModalGenerateTickets(true)}
                >
                  Generate tickets
                </PurpleButton>
                {isTicketSelectedExistBtn(selectedTickets)}
              </span>
              <span className="px-3 py-2 rounded bg-primary d-flex align-items-center justify-content-between">
                <FaPesoSign className="me-2" />
                {responseData[currentTicketTypeActive]?.price}
              </span>
            </div>

            <TicketTable
              ticketTypeID={responseData[currentTicketTypeActive]?.id}
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
        currentTicketType={responseData[currentTicketTypeActive]?.id}
      />
      <DeleteTicketTypeModals
        show={modalDeleteTicketType}
        onHide={() => setModalDeleteTicketType(false)}
        concert_id={id}
        currentTicketType={responseData[currentTicketTypeActive]?.id}
      />
    </>
  );
};

export default TicketContainer;
