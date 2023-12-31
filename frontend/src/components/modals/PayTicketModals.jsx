import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import TicketContext from "../../context/TicketContext";
import { FaPesoSign } from "react-icons/fa6";
import { format, parse } from "date-fns";
import { InputTextField } from "../FormFields";
import { useFormik } from "formik";
import { PurpleButton } from "../CustomizedMaterials";
import { bookTicketSchema } from "../../schema/TicketSchemas";
import axios from "axios";
import { apiBaseUrl } from "../../utils/APIUtils";
import Alert from "react-bootstrap/Alert";

const PayTicketModals = (props) => {
  const { ticketInfo, ...rest } = props;
  axios.defaults.baseURL = apiBaseUrl;

  const { concertTicketPublicState, isModified, setIsModified } =
    useContext(TicketContext);

  const {
    values,
    errors,
    touched,
    status,
    setStatus,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema: bookTicketSchema,
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const payload = {
        boughtBy: values.email,
      };
      axios
        .patch(`/api/public/ticket/${ticketInfo["id"]}/`, payload)
        .then((response) => {
          rest.onHide();
          setIsModified(true);
        })
        .catch((err) => {
          console.log(err.response.data);
          setStatus({ message: err.response.data });
        });
    },
  });
  if (concertTicketPublicState === undefined) {
    return null;
  }

  if (ticketInfo === null) {
    return null;
  }

  return (
    <Modal {...rest} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title>Ticket book</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light p-4">
        {status && status.message ? (
          <Alert variant="danger">{status.message}</Alert>
        ) : null}
        <form onSubmit={handleSubmit} className="mb-4">
          <InputTextField
            className="col mb-3"
            labelName="Email"
            formikFieldName="email"
            propError={errors.email}
            propTouched={touched.email}
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="border border-2 p-3 mb-4">
            <span className="text-info fw-bold rounded">Ticket info</span>
            <div className="mt-1">
              <ul>
                <li>
                  - Concert name:
                  <span className="ms-1">
                    {concertTicketPublicState["name"]}
                  </span>
                </li>
                <li>
                  - Ticket name:
                  <span className="ms-1">{ticketInfo["name"]}</span>
                </li>
                <li className="d-inline-flex align-items-center">
                  - Ticket Price:
                  <span className="ms-1 d-inline-flex align-items-center">
                    <FaPesoSign />
                    {ticketInfo["price"]}
                  </span>
                </li>
                <li>
                  - Validity:
                  <span className="ms-1 d-inline-flex align-items-center">
                    {format(
                      parse(
                        ticketInfo["dateValidRange1"],
                        "yyyy-MM-dd",
                        new Date()
                      ),
                      "MMM. dd, yyyy"
                    )}{" "}
                    to{" "}
                    {format(
                      parse(
                        ticketInfo["dateValidRange2"],
                        "yyyy-MM-dd",
                        new Date()
                      ),
                      "MMM. dd, yyyy"
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <PurpleButton type="submit">Confirm</PurpleButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PayTicketModals;
