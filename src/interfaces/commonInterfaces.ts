export interface ILogin {
  email: String;
  password: String;
}

export interface Imeta {
  previousId: number;
  nextId: number;
  total: number;
}

export interface IDropDownCategory {
  category: String;
  _id: string;
}
export interface IAdminAddProduct {
  name: string;
  category: string;
  categoryId?: string;
  price: number;
  description: string;
  image?: string | ArrayBuffer | null | undefined;
}
export interface IEditProduct {
  name: string;
  price: string;
  _id: string;
  image: string;
  description: string;
  category: string;
  categoryId: string;
}

export interface IAllProducts {
  name: string;
  image: string;
  price: string;
  description: string;
  category: string;
  categoryId: string;
  _id: string;
}

export interface ICartProducts {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export interface ICartItems{
  category:string,
  categoryId:string,
  description:string,
  image:string,
  name:string,
  price:number
}

export interface ICartProducts{
  item:ICartItems[],
  product_Id:string,
  quantity:number,
  userId:string
}[]


export interface IUserAddress{
  home:(string | number),
  street:string,
  area: string
  city: string
  state: string
  country:string
  pin:number
  _id:string
}

export interface IAddUserAddress {
  home: string
  street: string
  area: string
  city: string
  state: string
  country: string,
  pin: number
}
export interface IUserAddressUpload{
  home:(string | number),
  street:string,
  area: string
  city: string
  country:string
  pin:string
}



export interface IUserDetails{
  email:string,
  firstName:string
  lastName:string
  image:string,
  isAdmin:boolean
  password:string,
  phone:number|number
  _id:string
}

export interface IUserInfo{
  firstName: string
    lastName:string
    image: string|any
    phone: number|string
}

export interface IUserAllProducts {
  page?:number
  searchProduct?:string
  categoryId?:string
  }

  export interface IUserAddToCart{
    product_Id:string
    quantity:number
    userId:string
  }


  export interface IGetAllCartProducts{
    userId?:string
    productId?:string
    quantity?:number
    removeId?:string
  }


  export interface IUpdateUserProfile {
    firstName: string
    lastName: string
    image?: string
    phone?: number|string
  }
  
