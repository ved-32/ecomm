import * as http from "../utils/http";

import { ILogin } from "../interfaces/commonInterfaces";
import { ISignUp } from "../interfaces/authInterfaces";

import ApiResponse from "../resources/domain/entity/IApiResponse";

//for login
export const logIn = (data?: ILogin): Promise<ApiResponse> => {
  return http.post(`/api/v1/auth/login`, data);
};


// for signup
export const signUp = (data?: ISignUp): Promise<ApiResponse> => {
  return http.post(`/api/v1/auth/signup`, data);
};
