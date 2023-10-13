import * as yup from "yup";

export const schema = yup.object().shape({
  url: yup
    .string()
    .url("Please enter a valid URL.")
    .required("URL is required."),
});
