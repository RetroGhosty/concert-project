import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";
import TicketContext from "../../context/TicketContext";
import { useFormik } from "formik";
import { ticketTypeSchema } from "../../schema/TicketSchemas";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";

const EditTicketTypeModals = (props) => {
  const { ticketTypeInfo, setTicketTypeInfo, dateMin, dateMax, setIsModified } =
    useContext(TicketContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema: ticketTypeSchema,
    initialValues: {
      ticketName: "",
      description: "",
      price: "",
      concertEvent: "",
    },
    onSubmit: (formValues) => {
      const { ticketName, description, concertEvent, price } = formValues;
      const payload = {
        name: ticketName,
        description: description,
        concertEvent: concertEvent,
        price: price,
        dateValidRange1: format(startDate, "yyyy-MM-dd"),
        dateValidRange2: format(endDate, "yyyy-MM-dd"),
      };
      axiosTokenIntercept
        .patch(`api/typeticket/${ticketTypeInfo.id}`, payload)
        .then((result) => {
          setIsModified(true);
          props.onHide();
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    },
  });

  useEffect(() => {
    if (ticketTypeInfo !== undefined && props.concert_id !== undefined) {
      setValues({
        ticketName: ticketTypeInfo.name,
        description: ticketTypeInfo.description,
        price: ticketTypeInfo.price,
        concertEvent: props.concert_id,
      });
      setStartDate(
        parse(ticketTypeInfo["dateValidRange1"], "yyyy-MM-dd", new Date())
      );
      setEndDate(
        parse(ticketTypeInfo["dateValidRange2"], "yyyy-MM-dd", new Date())
      );
    }
  }, [ticketTypeInfo]);

  const dateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(`${startDate} | ${endDate}`);
  };

  if (ticketTypeInfo === undefined) {
    return (
      <Modal {...props} size="lg" centered data-bs-theme="dark">
        <Modal.Header className="bg-dark text-light p-4">
          <Modal.Title>Edit Ticket Type</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="bg-dark text-light p-4">
            Loading ....
          </Modal.Body>
          <Modal.Footer className="bg-dark text-light p-4">
            <PurpleButton onClick={props.onHide}>Edit</PurpleButton>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  return (
    <Modal {...props} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title>Edit Ticket Type</Modal.Title>
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
          <PurpleButton type="submit">Edit</PurpleButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditTicketTypeModals;
