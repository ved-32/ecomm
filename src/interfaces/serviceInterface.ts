export interface IEditCate{
    id:string
    category:string
    slug:string
  }
  export interface IAddProduct{
    categoryId:string
    category:string
     name:string
     image:string
     price:number
     description:string
     _id?:string
  }

  export interface IDeleteProduct{
    params:any
  }

  export interface IAddToCart {
    userId: string;
    product_Id: string;
    quantity: number;
  }