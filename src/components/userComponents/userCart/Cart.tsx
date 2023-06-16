import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../../commonComponents/loader/Loader";
import { ICartProducts } from "../../../interfaces/commonInterfaces";
import { getAllCartProducts } from "../../../services/user";

import {
  cartCount,
  decreaseQuantity,
  increaseQuantity,
  isCartEmpty,
  removeProduct,
} from "../../../state/actions/cartAction";
import {
  Checkout,
  deductPriceOnDecreseBtn,
  increasePriceOnIncreaseBtn,
} from "../../../state/actions/checkoutAction";

import UserNavbar from "../userNavbar/UserNavbar";

import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState<ICartProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [removedIndex, setRemovedIndex] = useState<number>(-1);

  const total = useSelector((state: any) => state.CheckoutReducer.total);

  // displaying all cart products in cart
  const allCartProducts = async () => {
    const user_Id = localStorage.getItem("user") || "";
    const userData = await JSON.parse(user_Id);
    setIsLoading(true);
    const res = await getAllCartProducts({ userId: userData?.data });
    setCartProducts(res?.data?.data);
    if (res?.data?.data) {
      const sumOfQuantities = res?.data?.data.reduce(
        (sum: number, current: ICartProducts) => sum + current.quantity,
        0
      );

      dispatch(cartCount(sumOfQuantities));
      const totalPrice = res?.data?.data.reduce(
        (sum: number, current: ICartProducts) =>
          sum + current.quantity * current.item[0].price,
        0
      );
      dispatch(Checkout(totalPrice));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    allCartProducts();
  }, []);

  //for decreasing cart quantity
  const handleDecrease = async (quantity: number, index: number) => {
    const tempCartProducts = cartProducts;
    tempCartProducts[index].quantity = quantity > 1 ? quantity - 1 : 1;
    const getProductId = tempCartProducts[index].product_Id;
    setCartProducts([...tempCartProducts]);
    await getAllCartProducts({
      productId: getProductId,
      quantity: quantity - 1,
    });
    dispatch(deductPriceOnDecreseBtn(tempCartProducts[index].item[0].price));
    dispatch(decreaseQuantity(1));
  };

  //for increaseing cart quantity in cart
  const handleIncrease = async (quantity: number, index: number) => {
    const tempCartProducts = cartProducts;
    tempCartProducts[index].quantity = quantity + 1;
    const getProductId = tempCartProducts[index].product_Id;
    setCartProducts([...tempCartProducts]);
    await getAllCartProducts({
      productId: getProductId,
      quantity: quantity + 1,
    });
    dispatch(increasePriceOnIncreaseBtn(tempCartProducts[index].item[0].price));
    dispatch(increaseQuantity(1));
  };

  //for removing product from cart
  const handleRemove = async (
    productId: string,
    quantity: number,
    index: number
  ) => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      setRemovedIndex(index);
      const tempCartProducts = cartProducts;
      tempCartProducts.splice(index, 1);
      setCartProducts([...tempCartProducts]);

      let user_Id = localStorage.getItem("user") || "";
      const userData = await JSON.parse(user_Id);
      await getAllCartProducts({
        removeId: productId,
        userId: userData?.data,
      });
      toast.success("Product removed");
      setRemovedIndex(-1);
      dispatch(removeProduct(quantity));
    } else {
      toast.success("Product removed");
    }
  };
  return (
    <>
      <UserNavbar />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cartProducts.length === 0 && <h1>No Products in cart</h1>}
          <div className="cart_div">
            <div className="checkout_div">
              <div className="checkout">
                <h3>Total: ₹{total}</h3>
                <hr />
                <button>Checkout</button>
              </div>
            </div>
            {cartProducts?.map((ele, i: number) => {
              const { quantity } = ele;
              return (
                <>
                  <div className="cart_product" key={i}>
                    <>
                      <div className="single_product">
                        <div className="left_d">
                          <img
                            src={ele.item[0].image}
                            alt="i"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div className="right_d">
                          <p>Product Name: {ele.item[0].name}</p>
                          <p>Price: {ele.item[0].price}</p>
                          <p>Description: {ele.item[0].description}</p>
                        </div>
                      </div>
                    </>

                    <p className="q_title">Quantity:{quantity}</p>
                    <div className="last_d">
                      <button
                        disabled={quantity === 1 ? true : false}
                        onClick={() => handleDecrease(quantity, i)}
                        className="cart_btn"
                      >
                        -
                      </button>
                      <div className="qua">{quantity}</div>
                      <button
                        onClick={() => handleIncrease(quantity, i)}
                        className="cart_btn"
                      >
                        +
                      </button>
                      <div className="">
                        <button
                          disabled={removedIndex === i}
                          onClick={() =>
                            handleRemove(ele?.product_Id, quantity, i)
                          }
                          className="cart_btn remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
