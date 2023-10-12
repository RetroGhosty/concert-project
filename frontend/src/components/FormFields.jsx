import { useField, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";

export const InputTextField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propStatus,
    ...rest
  } = props;
  return (
    <div className="mb-4">
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <input
        type="text"
        id={formikFieldName}
        {...rest}
        className={
          propError && propTouched ? " form-control is-invalid" : "form-control"
        }
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};

export const DatePickerField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propValue,
    ...rest
  } = props;
  return (
    <div className="me-4">
      <label htmlFor={formikFieldName} className="form-label d-flex">
        {labelName}
      </label>
      <DatePicker
        id={formikFieldName}
        className={
          propError && propTouched ? "form-control is-invalid" : "form-control"
        }
        selected={propValue}
        minDate={new Date()}
        {...rest}
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};

export const TextAreaField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propValue,
    ...rest
  } = props;
  return (
    <div className="mb-3">
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <textarea
        id={formikFieldName}
        name={formikFieldName}
        className={
          propError && propTouched ? "form-control is-invalid" : "form-control"
        }
        type="text"
        rows={8}
        {...rest}
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};

export const FormikImageField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    propValue,
    ...rest
  } = props;
  return (
    <div className="mb-3">
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <input
        type="file"
        name={formikFieldName}
        id={formikFieldName}
        className={
          propError && propTouched ? "form-control is-invalid" : "form-control"
        }
        accept="image/jpeg, image/png"
        {...rest}
      />
      {propError && propTouched ? (
        <div className="feedback-invalid mt-2">{propError}</div>
      ) : null}
    </div>
  );
};
