import * as yup from "yup"

export const ConcertSchema = yup.object().shape({
    name: yup.string().min(5, "Way too short").max(50, "Way too long").required("Blank field"),
    limit: yup.number().min(1, "Invalid value").positive("Invalid value").integer("Invalid value").required("Blank field"),
    bannerImg: yup.mixed(),
    paragraph: yup.string().min(10, "Way too short").required("Blank field")
})
