import * as yup from "yup"

export const EditBasicSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("This is required"),
    username: yup
        .string()
        .min(5, "Way too short")
        .max(15, "Way too long")
        .required("This is required"),
    password: yup
        .string()
        .min(10, "Weak password"),
    first_name: yup
        .string()
        .min(2, "What kind of name is that?")
        .required("This is required"),
    last_name: yup
        .string()
        .min(2, "What kind of name is that?")
        .required("This is required"),
    birthdate: yup
        .date(),
    birthplace: yup
        .string()
        .min(5, "Thats not an address :/")
        .required("This is required")
})


/*
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    birthplace: ""

*/