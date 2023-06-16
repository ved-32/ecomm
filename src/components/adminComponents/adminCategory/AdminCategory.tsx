import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AdminNavbar from "../adminNavbar/AdminNavbar";
import { ICategory } from "../../../interfaces/adminInterface";
import { categorySchema } from "../../../validation/authValidation";
import { addCategory, editCategory } from "../../../services/admin";

import "./AdminCategory.css";

const AdminCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cate, setCate] = useState<string>(location?.state?.category);
  const [slug, setSlug] = useState<string>(location?.state?.slug);
  const [id] = useState<string>(location?.state?.id);
  const[isDisabled,setIsDisabled]=useState<boolean>(false)

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({ resolver: yupResolver(categorySchema) });


  const onSubmit = async (data: ICategory) => {
    setIsDisabled(true)
    const res = await addCategory(data);

    if (res.data?.data) {
    

      alert(res.data?.message);
      navigate("/view-all-category");
    } else {
      alert(res.data?.message);
    }
  };

  // admin editing category
  const EditCategory = async () => {
    let data:any = { id, cate, slug };
    const res = await editCategory(data);
    if (res?.data) {
      alert(res?.data?.message);
    }
    navigate("/view-all-category");
  };

  return (
    <>
      <AdminNavbar />
      <div className="add_category_div">
        <div className="">
          <h3>{location.state ? "Edit Category" : "Add Category"}</h3>
        </div>
        {
          <div className="category_form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="category_field">
                <input
                  className="category_field"
                  {...register("category", { required: true })}
                  placeholder="Enter Category"
                  value={cate}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCate(e.target.value)}
                />
                {errors.category && (
                  <p style={{ color: "red" }}>{errors.category.message}</p>
                )}
              </div>

              <div className="category_field">
                <input
                  className="category_field"
                  {...register("slug", { required: true })}
                  placeholder="Write slug for category"
                  value={slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
                />
                {errors.slug && (
                  <p style={{ color: "red" }}>{errors.slug.message}</p>
                )}
              </div>

              {location.state ? (
                <input
                  className="add_btn"
                  type="button"
                  value="Edit"
                  onClick={EditCategory}
                />
              ) : (
                <input type="submit" disabled={isDisabled} value="Add" className="add_btn" />
              )}
            </form>
          </div>
        }
      </div>
    </>
  );
};

export default AdminCategory;
