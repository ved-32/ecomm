import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {  toast } from 'react-toastify';

import Loader from "../../commonComponents/loader/Loader";
import { deleteAddress, userAddress } from "../../../services/user";
import UserNavbar from "../userNavbar/UserNavbar";
import { userAddressSchema } from "../../../validation/userAddressValidation";
import {
  IAddUserAddress,
  IUserAddress,
} from "../../../interfaces/commonInterfaces";

import "./UserAddress.css";

const UserAddress = () => {
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddUserAddress>({ resolver: yupResolver(userAddressSchema) });

  //displaying all addresses of user
  const showAllAddress = async (userIdDFromLocal: string) => {
    setIsLoading(true);
    const res = await userAddress({ userID: userIdDFromLocal });
    if (res?.data?.data?.address) {
      setIsLoading(false);
      setUserAddresses(res?.data?.data?.address);
    }else{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user_Id= localStorage.getItem("user")||"";
    const userData = JSON.parse(user_Id);
    showAllAddress(userData?.data);
  }, []);

  //for deleting user address
  const handleDeleteAddress = async (index: string) => {
    const user_Id: any = localStorage.getItem("user");
    const userData: any = JSON.parse(user_Id);
    const userIdFromLocal = userData?.data;
    const res = await deleteAddress({ index, userId: userIdFromLocal });

    if (res?.data) {
      const user_Id: any = localStorage.getItem("user");
      const userData = JSON.parse(user_Id);
      showAllAddress(userData?.data);
      toast.warn(res?.data?.message);
    }
  };

  const onSubmit = async (data: IAddUserAddress) => {
    setIsDisabled(true);
    const user_Id = localStorage.getItem("user")||"";
    const userData = JSON.parse(user_Id);
    const res = await userAddress({ userId: userData?.data, address: data });
    if (res) {
      setIsDisabled(false);
      setShowAddForm(!showAddForm);
      const user_Id: any = localStorage.getItem("user");
      const userData = JSON.parse(user_Id);
      showAllAddress(userData?.data);
      toast.success(res?.data?.message);
    }
  };

  return (
    <>
      <UserNavbar />
      {isLoading ? (
      <Loader/>
      ) : (
        <>
          <div className="">
            <div className="">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="add_address_toggle"
              >
                {!showAddForm ? "Add address" : "Back"}
              </button>
            </div>
            {showAddForm && (
              <div className="address_div">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=""><h3>Add Address</h3></div>
                  <div className="">
                    <input
                      {...register("home", { required: true })}
                      placeholder="Home"
                      className="address_input"
                    />
                    {errors.home && (
                      <p style={{ color: "red" }}>{errors.home.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      {...register("street", { required: true })}
                      placeholder="Street"
                      className="address_input"
                    />
                    {errors.street && (
                      <p style={{ color: "red" }}>{errors.street.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      {...register("area", { required: true })}
                      placeholder="Area"
                      className="address_input"
                    />
                    {errors.area && (
                      <p style={{ color: "red" }}>{errors.area.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      {...register("city", { required: true })}
                      placeholder="City"
                      className="address_input"
                    />
                    {errors.city && (
                      <p style={{ color: "red" }}>{errors.city.message}</p>
                    )}
                  </div>

                  <div className="">
                    <input
                      {...register("state", { required: true })}
                      placeholder="State"
                      className="address_input"
                    />
                    {errors.state && (
                      <p style={{ color: "red" }}>{errors.state.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      {...register("country", { required: true })}
                      placeholder="Country"
                      className="address_input"
                    />
                    {errors.country && (
                      <p style={{ color: "red" }}>{errors.country.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      {...register("pin", { required: true })}
                      placeholder="Pin"
                      className="address_input"
                    />
                    {errors.pin && (
                      <p style={{ color: "red" }}>{errors.pin.message}</p>
                    )}
                  </div>
                  <div className="">
                    <input
                      type="submit"
                      value="save"
                      disabled={isDisabled}
                      className="address_input save_address_btn"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="display_address">
            {userAddresses?.map((ele, i: number) => {
              const { home, street, area, city, state, country, pin, _id } =
                ele;
              return (
                <div className="single_address" key={i}>
                  <div className="home">Home: {home}</div>
                  <div className="home">Street: {street}</div>
                  <div className="home">Area: {area}</div>
                  <div className="home">City:{city}</div>
                  <div className="home">State:{state}</div>
                  <div className="home">Country: {country}</div>
                  <div className="home">PIN: {pin}</div>
                  <div className="delete_adddress">
                    <button
                      onClick={() => handleDeleteAddress(_id)}
                      className="del_address_btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default UserAddress;
