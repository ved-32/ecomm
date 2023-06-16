import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../commonComponents/loader/Loader";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import { IAllProducts } from "../../../interfaces/commonInterfaces";
import { deleteProduct, getAllProducts } from "../../../services/admin";

import "./AdminAllProducts.css";

const AdminAllProducts = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<IAllProducts[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //showing all products for admin
  const fetchAllProducts = async () => {
    setIsLoading(true);
    const res = await getAllProducts();
    if (res?.data?.data) {
      setIsLoading(false);

      setAllProducts(res?.data?.data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  //admin deleting products
  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);

    let answer = prompt("Are you sure");
    if (answer) {
      const res = await deleteProduct(id);
      if (res?.data?.data) {
    setIsLoading(false);

        fetchAllProducts();
      }

      alert(res?.data?.data);
    } else {
      alert("you cancelled to delete the product");
    }
  };

  //admin editing products
  const handleProductEdit = (product: IAllProducts) => {
    navigate("/add-product", { state: { product } });
  };

  return (
    <>
      <AdminNavbar />
        {isLoading && <Loader/>}
      <div className="all_pro_div">
        {allProducts &&
          allProducts?.map((ele, i: number) => {
            const {
              name,
              price,
              image,
              description,
              category,
              categoryId,
              _id,
            } = ele;

            return (
              <div className="product" key={i}>
                <div className="left" id="left">
                  <div className="pro_img">
                    <img
                      src={image}
                      alt="loading..."
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </div>
                <div className="right" id="right">
                  <div className="">Product Name:{name}</div>
                  <div className="">category:{category}</div>
                  {/* <div className="">categoryId:{categoryId}</div> */}
                  <div className="">Price:{price}</div>
                  <div className="d">Description:{description}</div>
                  <div className="btn_div_edit_del">
                  <div className="">
                    <button className="edit_pro_edit" onClick={() => handleProductEdit(ele)}>Edit</button>
                  </div>
                  <div className="">
                    <button className="delete_pro_edit" onClick={() => handleDeleteProduct(_id)}>
                      Delete
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AdminAllProducts;
