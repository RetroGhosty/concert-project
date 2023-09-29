import * as yup from "yup";

export const ticketTypeSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Way too short")
    .max(20, "Way too long")
    .required("Field required"),
  description: yup
    .string()
    .min(10, "Way too short")
    .max(100, "Way too long")
    .required("Field required"),
  price: yup
    .number()
    .min(0, "The price should not be in negative integer")
    .required("Field required"),
  concertEvent: yup.number().required(),
  dateValidRange1: yup.date().required(),
  dateValidRange2: yup.date(),
});

export const ticketSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Way too short")
    .max(20, "Way too long")
    .required("Field required"),
  description: yup
    .string()
    .min(10, "Way too short")
    .max(100, "Way too long")
    .required("Field required"),
  price: yup
    .number()
    .min(0, "The price should not be in negative integer")
    .required("Field required"),
});
