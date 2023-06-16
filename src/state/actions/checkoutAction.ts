
export const Checkout=(total:number)=>{
 return{
    type:"CHECKOUT",
    payload:total
 }
}


export const deductPriceOnDecreseBtn=(price:number)=>{
    return{
        type:"REDUCE_QUANTITY",
        payload:price   
    }
}



export const increasePriceOnIncreaseBtn=(price:number)=>{
    return{
        type:"INCREASE_QUANTITY",
        payload:price   
    }
}