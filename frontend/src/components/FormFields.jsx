import { useField, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";

export const InputTextField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    className,
    ...rest
  } = props;
  return (
    <div className={className}>
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <input
        type="text"
        value={rest.values}
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

export const InputNumberField = (props) => {
  const {
    labelName,
    formikFieldName,
    propError,
    propTouched,
    className,
    ...rest
  } = props;
  return (
    <div className={className}>
      <label htmlFor={formikFieldName} className="form-label">
        {labelName}
      </label>
      <input
        type="number"
        value={rest.values}
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
    minDate,
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
        minDate={minDate}
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
        value={rest.values}
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
