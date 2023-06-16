
interface ICheckoutState{
    total:number
}


const initialState:ICheckoutState={
    total:0
}


interface ICheckoutActionType{
    type:string,
    payload:number
}


export const CheckoutReducer=(state=initialState,action:ICheckoutActionType)=>{
    switch(action.type){
          case "CHECKOUT":
            return {
             ...state,
             total:action.payload 
            }

            case "REDUCE_QUANTITY":
            return {
             ...state,
             total:state.total-action.payload 
            }

            
            case "INCREASE_QUANTITY":
            return {
             ...state,
             total:state.total+action.payload 
            }
    }
    return state        
}
