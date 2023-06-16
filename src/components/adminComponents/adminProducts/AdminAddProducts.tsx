import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { IAddProducts } from "../../../interfaces/authInterfaces";
import { IDropDownCategory } from "../../../interfaces/commonInterfaces";

import {
  addProduct,
  editProduct,
  getAllCategory,
} from "../../../services/admin";

import AdminNavbar from "../adminNavbar/AdminNavbar";

import { adminAddProductSchema } from "../../../validation/adminProducts";

import "./AdminAddProducts.css";

export default function AdminAddProducts() {

  const navigate = useNavigate();
  const location = useLocation();

  const [allCategory, setAllCategory] = useState<IDropDownCategory[]>([]);
  const [file, setFile] = useState(location?.state?.product?.image);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [editedProduct, setEditedProduct] = useState(
    location.state === null
      ? {
          name: "",
          price: "",
          _id: "",
          image: "",
          description: "",
          category: "",
          categoryId: "",
        }
      : {
          name: location?.state?.product?.name,
          price: location?.state?.product?.price,
          _id: location?.state?.product?._id,
          image: location?.state?.product?.image,
          description: location?.state?.product?.description,
          category: location?.state?.product?.category,
          categoryId: location?.state?.product?.categortId,
        }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddProducts>({ resolver: yupResolver(adminAddProductSchema) });


  
  //admin adding products on submit
  const onSubmit = async (data: any) => {
    setIsDisabled(true);
    const id = allCategory?.find((ele) => ele.category === data.category);
    data.image = file;
    data.categoryId = id?._id;
    const res = await addProduct(data);
    if (res?.data?.success) {
      setIsDisabled(false);

      alert(res?.data?.message);
      navigate("/view-all-products");
    } else {
      alert(res?.data?.message);
    }
  };

  //fetching all category for admin to select category while adding products
  const getAllDropDownCategory = async () => {
    const res = await getAllCategory();

    if (res?.data?.data) {
      setAllCategory(res?.data?.data);
    }
  };

  useEffect(() => {
    getAllDropDownCategory();
  }, []);

  //converting image to base64
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base = event.target?.result;
        setFile(base);
        console.log(base);
      };
      reader.readAsDataURL(file);
    }
  };

  //admin product editing
  const handleEditSubmit = async () => {
    setIsDisabled(true);

    const id = allCategory?.find(
      (ele) => ele.category === editedProduct.category
    );
    const pro = { ...editedProduct, image: file };
    pro.categoryId = id?._id;
    pro._id = location.state.product._id;
    const res = await editProduct(pro);
    if (res.data?.data) {
      setIsDisabled(true);

      alert(res.data?.message);
      navigate("/view-all-products");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="product_div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              className="pro_input"
              {...register("name", { required: true })}
              placeholder="name"
              type="text"
              value={editedProduct?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>

          <div className="">
            <select
              {...register("category", { required: true })}
              className="pro_input"
              value={editedProduct?.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setEditedProduct({ ...editedProduct, category: e.target.value })
              }
            >
              <option>Select category</option>;
              {allCategory?.map((ele: IDropDownCategory, i: number) => {
                return (
                  <>
                    <option key={i}>{ele.category}</option>;
                  </>
                );
              })}
            </select>
            {errors.category && (
              <p style={{ color: "red" }}>{errors.category.message}</p>
            )}
          </div>

          <div className="">
            <input
              {...register("image", { required: true })}
              placeholder="image"
              type="file"
              className="pro_input"
              onChange={handleFileSelect}
            />
            {errors.image && (
              <p style={{ color: "red" }}>{errors.image.message}</p>
            )}
          </div>
          <div className="show_img">
            <img src={file} alt="" style={{ width: "100px" }} />
          </div>

          <div className="">
            <input
              {...register("price", { required: true })}
              placeholder="price"
              type="number"
              className="pro_input"
              value={editedProduct?.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
            />
            {errors.price && (
              <p style={{ color: "red" }}>{errors.price.message}</p>
            )}
          </div>

          <div className="">
            <textarea
              {...register("description", { required: true })}
              placeholder="description"
              className="pro_input"
              value={editedProduct?.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>

          {location?.state?.product ? (
            <input
              type="button"
              value="Edit"
              disabled={isDisabled}

              onClick={handleEditSubmit}
              className="pro_input"
            />
          ) : (
            <input
              type="submit"
              value="ADD"
              disabled={isDisabled}
              className="pro_input"
            />
          )}
        </form>
      </div>
    </>
  );
}
