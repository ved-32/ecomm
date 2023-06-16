export interface ISignUp {
  firstName: String;
  lastName: String;
  email: String;
  phone: Number;
  password: String;
  cnfrm_password?: String;
  image?: string;
}
export interface IAddProducts {
  name: String;
  category: String;
  categoryId?: String;
  image: String;
  price: Number;
  description: String;
  _id?:string
}

export interface ILogin {
  email: String;
  password: String;
}
