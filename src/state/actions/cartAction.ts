export const cartCount = (productQuantity: number) => {
  return {
    type: "SHOW_CART_COUNT",
    payload: productQuantity,
  };
};


export const decreaseQuantity = (productQuantity: number) => {
  return {
    type: "DECREASE_CART_QUANTITY",
    payload: productQuantity,
  };
};



export const increaseQuantity = (productQuantity: number) => {
  return {
    type: "INCREASE_CART_QUANTITY",
    payload: productQuantity,
  };
};



export const isCartEmpty = () => {
  return {
    type: "REMOVE_ALL_PRODUCTS",
  };
};



export const removeProduct = (quantity: number) => {
  return {
    type: "REMOVE_SINGLE_PRODUCT",
    payload: quantity,
  };
};
