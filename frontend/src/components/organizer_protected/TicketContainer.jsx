import React, { useState } from "react";
import { PurpleButton } from "../CustomizedMaterials";

import useFetchTicketType from "../../customHooks/useFetchTicketType";
import TicketTable from "./TicketTable";
import CreateTicketTypeModals from "../modals/CreateTicketTypeModals";

const TicketContainer = ({ id, dateMin, dateMax }) => {
  const [data, serverResponseCode] = useFetchTicketType(
    `/api/typeticket/${id}`
  );
  const [currentTicketTypeActive, setCurrentTicketTypeActive] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  if (serverResponseCode !== 200) {
    return (
      <>
        <div className="border-top border-info p-3">
          <div className="col-12 mb-3">
            <PurpleButton
              onClick={() => setModalShow(true)}
              className="p-2 me-3"
            >
              Create ticket type
            </PurpleButton>
          </div>
          Create your first ticket type!
        </div>
        <CreateTicketTypeModals
          show={modalShow}
          onHide={() => setModalShow(false)}
          concert_id={id}
        />
      </>
    );
  }
  console.log(data);
  return (
    <>
      <div className="border-top border-info p-3">
        <div className="col-12 mb-3">
          <PurpleButton onClick={() => setModalShow(true)} className="p-2 me-3">
            Create ticket type
          </PurpleButton>
          <PurpleButton className="p-2">EDIT TICKET TYPE</PurpleButton>
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
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col ticketInfoContainer p-0 ps-4 py-5">
            <PurpleButton className="mb-3">Generate tickets</PurpleButton>
            <TicketTable
              ticketTypeID={data[currentTicketTypeActive]?.id}
              currentTicketTypeActive={currentTicketTypeActive}
            />
          </div>
        </div>
      </div>
      <CreateTicketTypeModals
        show={modalShow}
        onHide={() => setModalShow(false)}
        concert_id={id}
      />
    </>
  );
};

export default TicketContainer;
