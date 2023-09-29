import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { ticketSchema } from "../../schema/TicketSchemas";
import { date } from "yup";

const CreateTicketTypeModals = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const { concert_id, dateMin, dateMax, ...rest } = props;

  const dateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (dateMin !== undefined) {
      setStartDate(new Date(dateMin));
    }
  }, [dateMin]);
  const { values, setValues, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema: ticketSchema,
      initialValues: {
        name: "",
        description: "",
        price: null,
        concertEvent: concert_id,
        dateValidRange1: null,
        dateValidRange2: null,
      },
    });

  if (dateMin === undefined) {
    return (
      <Modal {...rest} size="lg" centered data-bs-theme="dark">
        <Modal.Header className="bg-dark text-light p-4" closeButton>
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
    <Modal {...rest} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Ticket Type
        </Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body className="bg-dark text-light p-4">
          <div className="row">
            <div className="col-12">
              <label htmlFor="datePickerValue" className="form-label">
                Valid on
              </label>
            </div>
            <div className="col-12">
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
        </Modal.Body>
        <Modal.Footer className="bg-dark p-4">
          <PurpleButton onClick={props.onHide}>Create</PurpleButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateTicketTypeModals;
