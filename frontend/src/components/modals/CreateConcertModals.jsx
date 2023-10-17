import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { PurpleButton } from "../CustomizedMaterials";
import { Formik, useFormik, useFormikContext } from "formik";
import {
  DatePickerField,
  InputTextField,
  TextAreaField,
  FormikImageField,
  InputNumberField,
} from "../FormFields";
import { ConcertSchema } from "../../schema/ConcertSchema";
import axiosTokenIntercept from "../../utils/AxiosInterceptor";
import AuthContext from "../../context/AuthContext";
import { format } from "date-fns";
import TicketContext from "../../context/TicketContext";

const CreateConcertModals = (props) => {
  const { ...rest } = props;
  const { user } = useContext(AuthContext);
  const { setIsModified } = useContext(TicketContext);

  const formik = useFormik({
    validationSchema: ConcertSchema,
    initialValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      postal: "",
      bannerImg: null,
      paragraph: "",
      dateValidRange1: new Date(),
      dateValidRange2: null,
      organizerName: null,
    },

    // /api/organizer/concert/
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        address: values.address,
        city: values.city,
        province: values.province,
        postal: values.postal,
        bannerImg: values.bannerImg,
        paragraph: values.paragraph,
        dateValidRange1: format(values.dateValidRange1, "yyyy-MM-dd"),
        dateValidRange2: format(values.dateValidRange2, "yyyy-MM-dd"),
        organizerId: values.organizerName,
        id: values.organizerName,
      };

      console.log(payload);

      axiosTokenIntercept
        .post("/api/organizer/concert/", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          rest.onHide();
          setIsModified(true);
        })
        .catch((err) => {
          console.log(err.response.data["errors"]);
          formik.setErrors(err.response.data["errors"]);
        });
    },
  });

  useEffect(() => {
    if (user !== undefined) {
      formik.setFieldValue("organizerName", user.user_id);
    }
  }, [user]);

  if (user.user_id === undefined) {
    return (
      <Modal {...rest} size="lg" centered data-bs-theme="dark">
        <Modal.Body>Loading...</Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal {...rest} size="lg" centered data-bs-theme="dark">
      <Modal.Header className="bg-dark text-light p-4">
        <Modal.Title>Create Concert Event</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body className="bg-dark text-light p-4">
          <InputTextField
            labelName="Name of concert"
            className="mb-3"
            formikFieldName="name"
            propError={formik.errors.name}
            propTouched={formik.touched.name}
            values={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextAreaField
            labelName="Description"
            formikFieldName="paragraph"
            propError={formik.errors.paragraph}
            propTouched={formik.touched.paragraph}
            propValue={formik.values.paragraph}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="mb-3 row">
            <InputTextField
              labelName="Address"
              formikFieldName="address"
              className="col"
              propError={formik.errors.address}
              propTouched={formik.touched.address}
              values={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputNumberField
              labelName="Postal"
              className="col-4"
              formikFieldName="postal"
              propError={formik.errors.postal}
              propTouched={formik.touched.postal}
              values={formik.values.postal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-3 row align-items-start">
            <InputTextField
              className="col"
              labelName="City"
              formikFieldName="city"
              propError={formik.errors.city}
              propTouched={formik.touched.city}
              values={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputTextField
              className="col"
              labelName="Province"
              formikFieldName="province"
              propError={formik.errors.province}
              propTouched={formik.touched.province}
              values={formik.values.province}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-3 d-flex flex-row align-items-start">
            <DatePickerField
              labelName="Start Date"
              formikFieldName="dateValidRange1"
              propError={formik.errors.dateValidRange1}
              propTouched={formik.touched.dateValidRange1}
              propValue={formik.values.dateValidRange1}
              minDate={new Date()}
              maxDate={formik.values.dateValidRange2}
              onChange={(value) =>
                formik.setFieldValue("dateValidRange1", value)
              }
              onBlur={formik.handleBlur}
            />
            <DatePickerField
              labelName="End Date"
              formikFieldName="dateValidRange2"
              propError={formik.errors.dateValidRange2}
              propTouched={formik.touched.dateValidRange2}
              propValue={formik.values.dateValidRange2}
              minDate={formik.values.dateValidRange1}
              onChange={(value) =>
                formik.setFieldValue("dateValidRange2", value)
              }
              onBlur={formik.handleBlur}
            />
          </div>

          <FormikImageField
            labelName="Banner Image"
            formikFieldName="bannerImg"
            propError={formik.errors.bannerImg}
            propTouched={formik.touched.bannerImg}
            propValue={formik.values.bannerImg}
            onChange={(value) =>
              formik.setFieldValue("bannerImg", value.target.files[0])
            }
            onBlur={formik.handleBlur}
          />
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light p-4">
          <PurpleButton type="submit">Create Event</PurpleButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateConcertModals;
