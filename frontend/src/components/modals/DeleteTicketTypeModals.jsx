import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton, RedButton } from "../CustomizedMaterials";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import TicketContext from "../../context/TicketContext";

const DeleteTicketTypeModals = (props) => {
  const { currentTicketType, concert_id, ...rest } = props;
  const { setIsModified } = useContext(TicketContext);

  const ticketTypeDelete = (concertId) => {
    const payload = {
      concertEvent: concertId,
    };
    axiosTokenIntercept
      .delete(`/api/typeticket/${currentTicketType}/`, {
        data: payload,
      })
      .then((result) => {
        props.onHide();
        setIsModified(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (currentTicketType === undefined && concert_id === undefined) {
    return (
      <Modal {...rest} size="sm" centered data-bs-theme="dark">
        <Modal.Body className="bg-dark text-light p-5 d-flex flex-column align-items-center justify-content-center">
          <div>Loading .....</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal {...rest} size="sm" centered data-bs-theme="dark">
      <Modal.Body className="bg-dark text-light p-5 d-flex flex-column align-items-center justify-content-center">
        <div className="h4 mb-4">Are you sure?</div>
        <div>
          <RedButton
            onClick={() => ticketTypeDelete(concert_id)}
            className="mx-2"
          >
            Yes
          </RedButton>
          <PurpleButton onClick={props.onHide} className="mx-2">
            No
          </PurpleButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTicketTypeModals;
