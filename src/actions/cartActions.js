export function increaseCartAmount(productObject){

    return {

        type: 'INCREASE_CART_AMOUNT',
        payload: productObject
    }

}

export function decreaseCartAmount(productObject){

    return {

        type: 'DECREASE_CART_AMOUNT',
        payload: productObject
    }

}

export function removeFromCart (productObject){

    return{
        type: 'REMOVE_FROM_CART',
        payload: productObject
    }

}




