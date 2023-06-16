import * as Yup from "yup";

import { string } from "yup";

export const signUpSchema = Yup.object({
  firstName: string()
    .min(3, "min 3 charecters required")
    .max(20, "max 20 charecters you can enter")
    .required("required"),

  lastName: string().required("required").max(10, "max 10 charectors"),

  phone: Yup.number()
  .required('Please Enter Your Phone Number')
  .typeError('Enter a valid Phone Number')
  .test('phone', 'Enter 10 digits Number', value => {
    const phoneNumberRegex = /^\d{10}$/; 
    return phoneNumberRegex.test(String(value));
  }),

  email: string().email().required("required"),
  
  password: string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  )
  .required('Please enter your password'),
  cnfrm_password: string().oneOf([Yup.ref("password")], "Passwords must match").required("required"),
});




export const loginSchema = Yup.object({
  email: string().email().required("required"),
  password: string().required("Enter correct password"),
});



export const categorySchema = Yup.object({
  category: string().required("required"),
  slug: string().required("required"),
});
