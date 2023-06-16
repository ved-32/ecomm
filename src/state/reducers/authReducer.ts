const initialState: ILogin = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    isAdmin: false,
  },
  token: "",
};


export interface ILogin {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    isAdmin?: boolean;
  };
  token: string;
}



export interface ILoginActionType {
  type: string;
  payload: ILogin;
}


export const AuthReducer = (state = initialState, action: ILoginActionType) => {
  switch (action.type) {
    case "LOGIN": {
      const userFromLocal: any = localStorage.getItem("user");
      const localUser = JSON.parse(userFromLocal);
      console.log("userFromLocaluserFromLocal",userFromLocal)
      const { firstName, lastName, email, phone, image, isAdmin } =
        localUser?.user;
      const { token } = localUser;

      return {
        ...state,
        user: {
          ...state.user,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          image: image,
          isAdmin: isAdmin,
        },
        token: token,
      };
    }
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: {},
        token: "",
      };
    case "UPDATE_PROFILE":
      const userFromLocal: any = localStorage.getItem("user");
      const localUser = JSON.parse(userFromLocal);
      const { firstName, lastName, email, phone, image, isAdmin } =
        localUser.user;
      const { token } = localUser;
     

      return {
        ...state,
        user: {
          ...state.user,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          image: image,
          isAdmin: isAdmin,
        },
        token: token,
      };
  }
  return state;
};
