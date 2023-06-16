
export interface ITotalQuantity {
  totalQuantity: number;
}


const initialState: ITotalQuantity = {
  totalQuantity: 0,
};


export interface IActionType {
  type: string;
  payload: number;
}

export const CartReducer = (state = initialState, action: IActionType) => {
  switch (action.type) {
    case "SHOW_CART_COUNT":
      return {
        totalQuantity: action.payload,
      };

    case "DECREASE_CART_QUANTITY":
    return {
        ...state,
        totalQuantity: state.totalQuantity - action.payload
      };

    case "INCREASE_CART_QUANTITY":
      return {
        ...state,
        totalQuantity: state.totalQuantity + action.payload,
      };
    case "REMOVE_SINGLE_PRODUCT":
      return {
        ...state,
        totalQuantity: state.totalQuantity - action.payload,
      };
      
    case "REMOVE_ALL_PRODUCTS":
      return {
        ...state,
        totalQuantity: 0,
      };
  }

  return state;
};
