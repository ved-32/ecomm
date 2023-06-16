import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";

import axios from "axios";

import { ILogin } from "../../../interfaces/authInterfaces";
import { Login } from "../../../state/actions/authAction";
import { loginSchema } from "../../../validation/authValidation";

import "./Login.css";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  //for login
  const onSubmit = async (data: ILogin) => {
    setIsDisabled(true);
    const res = await axios.post(
      `http://localhost:8000/api/v1/auth/login`,
      data
    );
    if (res.data?.token) {
      localStorage.setItem("token", res.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data));
      dispatch(Login());
    }

    console.log("res after login", res);
    if (res?.data?.success) {
      setIsDisabled(false);
      if (res.data?.isAdmin) {
        navigate("/admin-dashboard");
      }
      if (!res.data?.isAdmin) {
        navigate("/user-dashboard");
      }
    } else {
      setIsDisabled(false);

      toast.warn(res?.data?.message);
    }
  };

  return (
    <>
      <div className="login_div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="login_input"
            />
          </div>
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <div className="">
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className="login_input"
            />
          </div>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <input
            type="submit"
            value="Login"
            disabled={isDisabled}
            className="login_input login_submit"
          />
        </form>
      </div>
    </>
  );
}
