import * as http from "../utils/http";

import ApiResponse from "../resources/domain/entity/IApiResponse";

import { IGetAllCartProducts, IUserAddToCart, IUserAllProducts } from "../interfaces/commonInterfaces";

//fetching all products for user
export const usersAllProducts = (
  data?: IUserAllProducts,
): Promise<ApiResponse> => {
  return http.post(`/api/v1/user/users-all-products`, data);
};



//for adding products to cart 
export const addToCart = (data?: IUserAddToCart): Promise<ApiResponse> => {
  return http.post(`/api/v1/user/add-to-cart`, data);
};


//for fetching all products in user cart
export const getAllCartProducts = (
  data?: IGetAllCartProducts,
): Promise<ApiResponse> => {
  return http.post(`/api/v1/user/cart-products`, data);
};

export interface IUserDetailsSubInterface{
  firstName?:string
  lastName?:string
  image?:string
  phone?:number
}
  export interface IUserDetails{
    userId?:string
    userInfo?:IUserDetailsSubInterface
  }
//for getting user profile info
export const getUserDetails = (
  data?: any,
): Promise<ApiResponse> => {

  return http.post(`/api/v1/user/user-details`, data);
};


export interface IUserAddressFields{
  home:(string | number),
  street:string
  area: string
  city: string
  state: string
  country:string
  pin: number|string
}
export interface IUserAddress{
  userID?:string
  index?:string
  userId?:string
  address?:IUserAddressFields

}
//for addind user address
export const userAddress = (data?:IUserAddress): Promise<ApiResponse> => {
  return http.post(`/api/v1/user/user-address`, data);
};



export interface IDeleteUserAddress{
  index:string|number
  userId:string
}


//for deleting user address
export const deleteAddress = (params?: any): Promise<ApiResponse> => {
  const { index, userId } = params;
  console.log("data in user.ts0000000000000000000",params)
return http.remove(`/api/v1/user/delete-address/${userId}/${index}`, params);
};
