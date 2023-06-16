import * as Yup from "yup";

import { string } from "yup";

export const userAddressSchema = Yup.object({

    home: string().required("required"),
    street: string().required("required"),
    area: string().required("required"),
    city: string().required("required"),
    state: string().required("required"),
    country: string().required("required"),
    pin:Yup.number().required("required"),

})
