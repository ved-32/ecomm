import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import UserNavbar from "../userNavbar/UserNavbar";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Loader from "../../commonComponents/loader/Loader";

import { getUserDetails } from "../../../services/user";
import { UpdateProfile } from "../../../state/actions/authAction";
import {
  IUpdateUserProfile,
  IUserDetails,
} from "../../../interfaces/commonInterfaces";

import { updatedUserProfileSchema } from "../../../validation/userProfileValidation";

import "./UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state: any) => state.AuthReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [file, setFile] = useState<string>(user.image);
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserProfile>({
    resolver: yupResolver(updatedUserProfileSchema),
  });

  //for displaying user info in profile component
  const fetchSignUpInfoForProfile = async () => {
    const user_Id = localStorage.getItem("user")||"";
    const userData = JSON.parse(user_Id);
    setIsLoading(true);
    const res = await getUserDetails({ userId: userData?.data });
    if (res?.data?.data) {
      setIsLoading(false);
      setUserDetails(res?.data?.data);
    }
  };

  useEffect(() => {
    fetchSignUpInfoForProfile();
  }, []);

  //for converting user pic to base64
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base: any = event.target?.result;
        setFile(base);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (profileData: IUpdateUserProfile) => {
    setIsDisabled(true);
    const profile: IUpdateUserProfile = {
      firstName: profileData?.firstName,
      lastName: profileData.lastName,
      image: file as string,
      phone: profileData.phone,
    };
    const user_Id = localStorage.getItem("user")||"";
    const userFromLocal = JSON.parse(user_Id);
    const data = { userId: userFromLocal?.data, userInfo: profile };
    setIsLoading(true);
    const res = await getUserDetails(data);
    if (res) {
      toast.success("Profile Updated successfully");
      setIsLoading(false);
    }
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userFromLocal,
        user: { ...userFromLocal.user, ...data.userInfo },
      })
    );
    setIsEdit(true);
    setIsDisabled(false);
    fetchSignUpInfoForProfile();
    dispatch(UpdateProfile());
    if (res?.data?.data) {
      alert(res?.data?.message);
      navigate("/user-profile");
    }
  };

  return (
    <>
      <UserNavbar />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="">
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="btn_on_profile"
            >
              {isEdit ? "Edit" : "Back"}
            </button>
          </div>
          {isEdit && (
            <div className="profile_div">
              <div className="profile_info">
                <img
                  src={userDetails?.image}
                  alt="no pic"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                />
              </div>
              <div className="profile_info">
                First Name-{userDetails?.firstName}
              </div>
              <div className="profile_info">
                Last Name-{userDetails?.lastName}
              </div>
              <div className="profile_info">Email-{userDetails?.email}</div>
              <div className="profile_info">Mob-{userDetails?.phone}</div>
            </div>
          )}

          {!isEdit && (
            <div className="edit_profile">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <input
                    {...register("image")}
                    type="file"
                    name="image"
                    onChange={handleFileSelect}
                    className="profile_input"
                  />
                  {errors.image && (
                    <p style={{ color: "red" }}>{errors.image.message}</p>
                  )}
                  <img
                    src={file}
                    alt="no pic"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                </div>
                <div className="">
                  <input
                    {...register("firstName", { required: true })}
                    className="profile_input"
                    placeholder="first name"
                    defaultValue={userDetails?.firstName}
                  />
                  {errors.firstName && (
                    <p style={{ color: "red" }}>{errors.firstName.message}</p>
                  )}
                </div>
                <div className="">
                  <input
                    {...register("lastName", { required: true })}
                    className="profile_input"
                    placeholder="last name"
                    defaultValue={userDetails?.lastName}
                  />
                  {errors.lastName && (
                    <p style={{ color: "red" }}>{errors.lastName.message}</p>
                  )}
                </div>
                <div className="">
                  <input
                    {...register("phone", { required: true })}
                    className="profile_input"
                    placeholder="phone"
                    defaultValue={userDetails?.phone}
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone.message}</p>
                  )}
                </div>
                <input
                  type="submit"
                  value="save"
                  disabled={isDisabled}
                  className="profile_input save_profilr"
                />
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
