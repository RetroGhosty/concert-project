import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { PurpleButton, RedButton } from "../CustomizedMaterials";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";

const DeleteConcertModals = (props) => {
  const { concertId, ...rest } = props;
  const navigate = useNavigate();

  const deleteConcertEvent = (concertId) => {
    const payload = {
      id: concertId,
    };
    axiosTokenIntercept
      .delete("/api/organizer/concert/", { data: payload })
      .then((response) => {
        navigate(-1);
      })
      .catch((errResponse) => {
        console.log(errResponse.response);
      });
  };

  if (concertId === undefined) {
    return (
      <Modal {...rest} size="sm" centered data-bs-theme="dark">
        <Modal.Body className="bg-dark text-light p-5 d-flex flex-column align-items-center justify-content-center">
          <div className="h4 mb-4">Loading...</div>
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
            className="mx-2"
            onClick={() => deleteConcertEvent(concertId)}
          >
            Yes
          </RedButton>
          <PurpleButton onClick={rest.onHide} className="mx-2">
            No
          </PurpleButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConcertModals;
