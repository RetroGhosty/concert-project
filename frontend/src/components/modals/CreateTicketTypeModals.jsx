import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { ticketTypeSchema } from "../../schema/TicketSchemas";
import { format, parse, parseISO } from "date-fns";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import TicketContext from "../../context/TicketContext";
import AuthContext from "../../context/AuthContext";

const CreateTicketTypeModals = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { user } = useContext(AuthContext);

  const { dateMin, dateMax, setIsModified } = useContext(TicketContext);

  const dateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (dateMin !== undefined) {
      setStartDate(new Date(dateMin));
      setEndDate(new Date(dateMin));
    }
  }, [dateMin]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema: ticketTypeSchema,
      initialValues: {
        ticketName: "",
        description: "",
        price: "",
        concertEvent: props.concert_id,
      },
      onSubmit: (values) => {
        const { ticketName, description, concertEvent, price } = values;
        const payload = {
          name: ticketName,
          description: description,
          concertEvent: concertEvent,
          price: price,
          dateValidRange1: format(startDate, "yyyy-MM-dd"),
          dateValidRange2: format(endDate, "yyyy-MM-dd"),
          organizerName: user.user_id,
        };

        axiosTokenIntercept
          .post(`/api/typeticket/${concertEvent}`, payload)
          .then((result) => {
            setIsModified(true);
            props.onHide();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  if (dateMin === undefined && user === undefined) {
    return (
      <Modal {...props} size="lg" centered data-bs-theme="dark">
        <Modal.Header className="bg-dark text-light p-4">
          <Modal.Title id="contained-modal-title-vcenter">
            Create Ticket Type
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-dark text-light p-4">
            Loading..........
          </Modal.Body>
          <Modal.Footer className="bg-dark p-4">
            <PurpleButton onClick={props.onHide}>Create</PurpleButton>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  return (
    <Modal {...props} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title id="contained-modal-title-vcenter">
          Create Ticket Type
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body className="bg-dark text-light p-4">
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="ticketName" className="form-label">
                Ticket Name
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                id="ticketName"
                value={values.ticketName}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  errors.ticketName ? "form-control is-invalid" : "form-control"
                }
              />
              {errors.ticketName && touched.ticketName ? (
                <div className="feedback-invalid mt-2">{errors.ticketName}</div>
              ) : null}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
            </div>
            <div className="col">
              <textarea
                type="text"
                id="description"
                rows={5}
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  errors.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errors.description && touched.description ? (
                <div className="feedback-invalid mt-2">
                  {errors.description}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4 d-flex flex-column">
              <label htmlFor="datePickerValue" className="form-label">
                Valid on
              </label>
              <DatePicker
                id="datePickerValue"
                className="form-control"
                minDate={new Date(dateMin)}
                maxDate={new Date(dateMax)}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={dateChange}
                showDisabledMonthNavigation
                selectsRange
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4 d-flex flex-column">
              <label htmlFor="price" className="form-label">
                Ticket Price
              </label>
              <input
                type="number"
                value={values.price}
                id="price"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.price ? "form-control is-invalid" : "form-control"
                }
              />
              {errors.price && touched.price ? (
                <div className="feedback-invalid mt-2">{errors.price}</div>
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark p-4">
          <PurpleButton type="submit">Create</PurpleButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateTicketTypeModals;
