import * as Yup from "yup";

import { string, number } from "yup";

export const adminAddProductSchema = Yup.object({
  name: string().required("required"),
  category: string().required("required"),
  price: number().required("required"),
  description: string().required("required").max(200),
  image: string().required("required"),
});
