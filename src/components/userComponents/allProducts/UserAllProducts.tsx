import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

import { getAllCategory } from "../../../services/admin";
import { addToCart, usersAllProducts } from "../../../services/user";

import { debounce } from "lodash";

import Loader from "../../commonComponents/loader/Loader";


import {
  IAllProducts,
  IDropDownCategory,
} from "../../../interfaces/commonInterfaces";

import { cartCount } from "../../../state/actions/cartAction";

import "../../adminComponents/adminProducts/AdminAddProducts.css";
import "./UserAllProducts.css";

const UserAllProducts = () => {
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState<IAllProducts[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allCategory, setAllCategory] = useState<IDropDownCategory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  
  const getCartItems = useSelector((state: any) => state.CartReducer.totalQuantity );

  const debounceApiCall = debounce(async (data: any) => {
    const res = await usersAllProducts(data);
    if (res?.data?.data) {
      setIsLoading(false);
      setAllProducts(res?.data?.data);
    }
  }, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchProduct = e.target.value;
    const data: any = { searchProduct };
    debounceApiCall(data);
  };

  //for showing all category list for user
  const getAllDropDownCategory = async () => {
    const res = await getAllCategory();
      if (res?.data?.data) {
      setAllCategory(res?.data?.data);
    }
  };

  useEffect(() => {
    getAllDropDownCategory();
  }, []);

  //for selecting category and getting category id
  const handleChooseCategory = async (e: ChangeEvent<HTMLSelectElement>) => {
    const id = allCategory?.find((ele) => ele.category === e.target.value);
    setIsLoading(true);
    const data: any = { categoryId: id?._id };
    const res = await usersAllProducts(data);

    if (res?.data?.data) {
      setIsLoading(false);
      setAllProducts(res?.data?.data);
    }
  };

  //for displaying products for user
  const productsForUsers = async (page: number) => {
    setIsLoading(true);
    const res = await usersAllProducts({ page });

    setIsLoading(false);
    if (res?.data?.data) {
      if (page === 1) {
        setAllProducts(res?.data?.data);
      } else {
        setAllProducts((prevProducts) => {
          return [...prevProducts, ...res?.data?.data];
        });
        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      }
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    productsForUsers(page);
  }, [page]);

  //for adding product to cart
  const handleAddToCartButton = async (product_Id: string, index: number) => {
    setIndex(index);
    const user_Id = localStorage.getItem("user")||"";
    const userData = JSON.parse(user_Id);
    const data = {
      userId: userData?.data,
      product_Id,
      quantity: counts[product_Id] || 1,
    };
   dispatch(cartCount(getCartItems + data.quantity));
   const res = await addToCart(data);

    if (res?.data?.data) {
     setIndex(-1)
      toast.success(res?.data?.message);
    }
  };

  //for decreasing product quantity before adding to cart
  const handleDecrease = (productId: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 0) - 1, 0),
    }));
  };

  //for Increasing product quantity before adding to cart
  const handleIncrease = (productId: string,index:number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  return (
    <>
      <div className="filter_div">
        <div className="form_div">
          <form>
            <div className="common">
              <input
                className="search_input"
                type="text"
                placeholder="Search product by name"
                onChange={handleChange}
              />
            {/* <input type="submit" value="search" className="submit_search" /> */}
            </div>
          </form>
        </div>
        <div className="filter_category">
          <select
            className="select_cate"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChooseCategory(e)
            }
          >
            <option>search by category</option>;
            {allCategory?.map((ele: IDropDownCategory, i: number) => {
              return <option key={i}>{ele.category}</option>;
            })}
          </select>
        </div>
      </div>

      {
        <>
          {isLoading && <Loader />}
          <div className="all_pro_division">
            <InfiniteScroll
              dataLength={allProducts?.length}
              next={() => setPage(page + 1)}
              hasMore={true}
              loader={
                allProducts.length > 0 ? (
                  <h4>{`total ${allProducts.length} products found`}</h4>
                ) : (
                  <p>No product found</p>
                )
              }
              endMessage={
                allProducts.length === 6 ? (
                  <p>loading...</p>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                )
              }
            >
              {allProducts?.map((ele: IAllProducts, i: number) => {
                const { name, price, image, description, category, _id } = ele;
                const productId = ele._id;
                const count = counts[productId] || 1;

                return (
                  <div className="product_division" key={i}>
                    <div className="pro_img_div">
                      <img
                        src={image}
                        alt="loading..."
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>

                    <div className="detail_div">
                      <div className="">Product Name:{name}</div>
                      <div className="">category:{category}</div>
                      <div className="">Price:{price}</div>
                      <div className="">Description:{description}</div>

                      <div className="">
                        <button
                          onClick={() => handleDecrease(productId)}
                          style={{ padding: "10px" }}
                          className="btn_add_to_cart"
                        >
                          -
                        </button>
                        <button
                          style={{ padding: "10px" }}
                          className="btn_add_to_cart"
                        >
                          {count}
                         
                        </button>
                        <button
                          onClick={() => handleIncrease(productId,i)}
                          style={{ padding: "10px" }}
                          className="btn_add_to_cart"
                        >
                          +
                        </button>
                      </div>

                      <div className="">
                        <button
                          onClick={() => handleAddToCartButton(_id, i)}
                          disabled={index === i}
                          className="add_to_cart_btn"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </>
      }
    </>
  );
};

export default UserAllProducts;
