import * as yup from "yup";

export const ConcertSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Way too short")
    .max(50, "Way too long")
    .required("This field is required"),
  address: yup
    .string()
    .min(5, "Way too short")
    .required("This field is required"),
  city: yup.string().required("This field is required"),
  province: yup.string().required("This field is required"),
  postal: yup
    .number()
    .required("Invalid postal code")
    .positive("Invalid postal code"),
  paragraph: yup
    .string()
    .min(10, "Way too short")
    .required("This field is required"),
  dateValidRange1: yup.date().required("This field is required"),
  dateValidRange2: yup.date().required("This field is required"),
});
