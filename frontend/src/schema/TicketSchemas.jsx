import * as yup from "yup";

export const ticketTypeSchema = yup.object().shape({
  ticketName: yup
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

export const generateTicketSchema = yup.object().shape({
  createdBy: yup.string().required("This field is required"),
  ticketType: yup.string().required("This field is required"),
  howManyTicket: yup
    .number()
    .min(1, "Invalid value")
    .required("This field is required"),
});

export const bookTicketSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
});
