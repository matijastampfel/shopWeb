export function setName(event){
return{
    type: 'SET_NAME',
    payload: event.target.value
}

}

export function setPrice(event){
    return{
        type: 'SET_PRICE',
        payload: event.target.value
    }

}

export function setAmount(event){
    return{
        type: 'SET_AMOUNT',
        payload: event.target.value
    }

}

export function setImage(event){
    return{
        type: 'SET_IMAGE',
        payload: event.target.value
    }

}

export function pushToDatabase(){

    return{

        type: 'PUSH_TO_DATABASE'
    }

}
