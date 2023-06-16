import * as http from "../utils/http";

import ApiResponse from "../resources/domain/entity/IApiResponse";

import { ICategory } from "../interfaces/adminInterface";
import {
  IAddProduct,
  IEditCate,
} from "../interfaces/serviceInterface";


//for admin to add category
export const addCategory = (data?: ICategory): Promise<ApiResponse> => {
  return http.post(`/api/v1/admin/add-category`, data);
};


//for getting all category for list 
export const getAllCategory = (data?: ICategory): Promise<ApiResponse> => {
  return http.get(`/api/v1/admin/get-all-category`, data);
};


//for editing category 
export const editCategory = (data?: IEditCate): Promise<ApiResponse> => {
  console.log("data in side service",data)
  return http.put(`/api/v1/admin/edit-category`, data);
};

//for adding products
export const addProduct = (data?: IAddProduct): Promise<ApiResponse> => {
  return http.post(`/api/v1/admin/add-product`, data);
};


//for fetching all products
export const getAllProducts = (data?: IAddProduct): Promise<ApiResponse> => {
  return http.get(`/api/v1/admin/get-all-products`, data);
};


//for deleting product
export const deleteProduct = (
  params?: string
): Promise<ApiResponse> => {
  return http.remove(`/api/v1/admin/delete-product/${params}`);
};


//for editing product
export const editProduct = (data?: IAddProduct): Promise<ApiResponse> => {
  return http.put(`/api/v1/admin/edit-product`, data);
};
