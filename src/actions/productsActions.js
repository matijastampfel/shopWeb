export function updateProductsState(){
    return{
        type: 'UPDATE_STATE'
    }

}


export function addNewProduct (productObject){

    return{
        type: 'ADD_NEW_PRODUCT',
        payload: productObject,
        regretable: true
    }

}

export function editable (){

    return{
        type: 'EDITABLE'
    }

}

export function submitChange (productObject){

    return{
        type: 'SUBMIT_CHANGE',
        payload: productObject,
        regretable: true
    }

}

export function updateChangedProduct (event){

    return{
        type: 'UPDATE_CHANGED_PRODUCT',
        payload: event,
        regretable: true
    }

}

export function deleteProduct (key){

    return{
        type: 'DELETE_PRODUCT',
        payload: key,
        regretable: true
    }

}

export function regretAction (key){

    return{
        type: 'REGRET_ACTION',
        payload: key
    }

}





