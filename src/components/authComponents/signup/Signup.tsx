import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {  toast } from 'react-toastify';

import axios from "axios";

import { ISignUp } from "../../../interfaces/authInterfaces";
import { signUpSchema } from "../../../validation/authValidation";

import "./Signup.css";

export default function App() {
  
  const navigate = useNavigate();
  const [file, setFile] = useState<any>();
  const[isDisabled,setIsDisabled]=useState<boolean>(false)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(signUpSchema) });

  //for signup
  const onSubmit = async (data: ISignUp) => {
    toast.success("Registered Sucessfully")
    setIsDisabled(true)
    const { firstName, lastName, email, phone, password } = data;
    data.image = file;
    const { image } = data;
    const res = await axios.post("http://localhost:8000/api/v1/auth/signup", {
      firstName,
      lastName,
      email,
      phone,
      password,
      image,
    });


    if (res) {
    setIsDisabled(false)

      navigate("/login");
    }
  };

  //converting user pic to base64
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base = event.target?.result;
        setFile(base);
        console.log(base);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="signup_div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="show_img">
            <div className="">
              <input
                type="file"
                onChange={handleFileSelect}
                className="signup_input"
              />
            </div>
            <img
              src={file}
              alt="pic"
              {...register("image")}
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid black",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="">
            <input
              {...register("firstName", { required: true })}
              placeholder="First name"
              className="signup_input"
            />
          </div>

          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName.message}</p>
          )}

          <div className="">
            <input
              {...register("lastName", { required: true })}
              placeholder="Last name"
              className="signup_input"
            />
          </div>
          {errors.lastName && (
            <p style={{ color: "red" }}>{errors.lastName.message}</p>
          )}

          <div className="">
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="signup_input"
            />
          </div>
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <div className="">
            <input
              {...register("phone", { required: true })}
              placeholder="Phone"
              className="signup_input"
            />
          </div>
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}

          <div className="">
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className="signup_input"
            />
          </div>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <div className="">
            <input
              {...register("cnfrm_password", { required: true })}
              placeholder="confirm Password"
              className="signup_input"
            />
          </div>
          {errors.cnfrm_password && (
            <p style={{ color: "red" }}>{errors.cnfrm_password.message}</p>
          )}
          <input type="submit" value="Sign up" disabled={isDisabled} className="signup_input submit_signup" />
        </form>
      </div>
    </>
  );
}
