import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";
import { useFormik } from "formik";
import { generateTicketSchema } from "../../schema/TicketSchemas";
import AuthContext from "../../context/AuthContext";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import TicketContext from "../../context/TicketContext";

const CreateTicketModals = (props) => {
  const { currentTicketType, ...rest } = props;
  const { user } = useContext(AuthContext);
  const { setIsModified } = useContext(TicketContext);
  const {
    values,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    validationSchema: generateTicketSchema,
    initialValues: {
      ticketType: "",
      createdBy: "",
      howManyTicket: 1,
    },
    onSubmit: (fieldValues) => {
      axiosTokenIntercept
        .post(`/api/ticket/${currentTicketType}/`, fieldValues)
        .then((result) => {
          setIsModified(true);
          props.onHide();
        })
        .catch((err) => {
          console.log(err.result);
        });
    },
  });

  useEffect(() => {
    if (currentTicketType !== undefined && user !== undefined) {
      setValues({
        ticketType: currentTicketType,
        createdBy: user.user_id,
        howManyTicket: 1,
      });
    }
  }, [currentTicketType, user]);

  if (currentTicketType === undefined) {
    return (
      <Modal {...rest} size="lg" centered data-bs-theme="dark">
        <Modal.Header className="bg-dark text-light p-4">
          <Modal.Title>Generate tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light p-4">Loading...</Modal.Body>
        <Modal.Footer className="bg-dark text-light p-4">
          <PurpleButton onClick={props.onHide}>Generate Ticket</PurpleButton>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal {...rest} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title>Generate Tickets</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body className="bg-dark text-light p-4">
          <label htmlFor="howManyTicket" className="form-label mb-3">
            Tickets
          </label>
          <input
            type="number"
            id="howManyTicket"
            className={
              errors.howManyTicket ? "form-control is-invalid" : "form-control"
            }
            value={values.howManyTicket}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.howManyTicket && touched.howManyTicket ? (
            <div className="feedback-invalid mt-2">{errors.howManyTicket}</div>
          ) : null}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light p-4">
          <PurpleButton type="submit">Generate Ticket</PurpleButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateTicketModals;
