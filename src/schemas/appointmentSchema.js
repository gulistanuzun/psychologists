import * as yup from "yup";

export const appointmentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name is too short"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[0-9\s()-]{7,20}$/, "Enter a valid phone number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  meetingTime: yup
    .string()
    .required("Meeting time is required"),
  comment: yup
    .string()
    .required("Comment is required"),
});
