import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AdminNavbar from "../adminNavbar/AdminNavbar";
import Loader from "../../commonComponents/loader/Loader";
import { getAllCategory } from "../../../services/admin";
import { ICat } from "../../../interfaces/adminInterface";

import "./AllCategory.css"

const AllCategory = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<ICat[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  //showing all category for admin
  const showAllCategory = async () => {
    setIsLoading(true)
    const res = await getAllCategory();
    if (res.data?.data) {
      setIsLoading(false)
    setCategories(res.data?.data);
    }
  };

  useEffect(() => {
    showAllCategory();
  }, []);

  //admin editing category
  const handleEdit = async (id: string, category: string, slug: string) => {
    navigate("/add-category", { state: { category, slug, id } });
  };
  return (
    <>
      <AdminNavbar />
      <div className="all_category_div">
        <h2 className="cate_title"> Admin all categories</h2>
        {isLoading?<Loader/>:(

<div className="">
<table className="category_table">
  <tr className="table_head">
    <th>S.No</th>
    <th>Category Name</th>
    <th>Slug</th>
    <th>Action</th>
  </tr>
 
  {categories?.map((ele: ICat, i: number) => {
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{ele?.category}</td>
        <td>{ele?.slug}</td>
        <td>
          <button
          className="edit_cate_btn"
            onClick={() =>
              handleEdit(ele?._id, ele?.category, ele?.slug)
            }
          >
            Edit
          </button>
        </td>
        <hr />
      </tr>
    );
  })}
</table>
</div>
        )}

      
      </div>
    </>
  );
};

export default AllCategory;
