import * as Yup from "yup";

import { string } from "yup";


export const updatedUserProfileSchema = Yup.object({
  firstName: string(),
  lastName: string(),
  image: string(),
  phone:Yup.number()
  .required('Please Enter Your Phone Number')
  .typeError('Enter a valid Phone Number')
  .test('phone', 'Enter 10 digits Number', value => {
    const phoneNumberRegex = /^\d{10}$/; 
    return phoneNumberRegex.test(String(value));
  }),
});
