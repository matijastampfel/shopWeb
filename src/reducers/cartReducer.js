var initialProducts = [{name: 'Šipun Žlahtina 2015', price: 7.99, amount: 100, image: 'https://www.thewineandmore.com/media/2936/zlahtina-sipun.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131383996510000000', cartAmount: 0, id: 0},
    {name: 'Tomić Beleca 2015', price: 58, amount: 5, image: 'https://www.thewineandmore.com/media/2262/tomi%C4%87-beleca-2014.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131402800040000000', cartAmount: 0, id: 1},
    {name: 'Matuško Dingač 2011', price: 90, amount: 89, image: 'https://www.thewineandmore.com/media/2834/matusko-dingac.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131419348670000000', cartAmount: 0, id: 2},
    {name: 'Josić Ciconia Nigra Cuvée Superior 2013', price: 90, amount: 49, image: 'https://www.thewineandmore.com/media/2503/josic-couvee-superior.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131413938130000000', cartAmount: 0, id: 3},
    {name: 'Pošip Milan 2016', price: 19, amount: 10, image: 'https://www.thewineandmore.com/media/156740/posip-milan.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131421082170000000', cartAmount: 0, id: 4}];

const cartReducer = (state = {
    cartProducts: initialProducts,
    total: 0,
    readOnly: true,
    idsToRemove: [],
    changedProducts: []
}, action) => {

    let newState = {...state};
    let newCartProducts = state.cartProducts;

    switch(action.type){
        case 'ADD_NEW_PRODUCT':
            let newProductsList1 = state.cartProducts
            let product = action.payload;
            product.cartAmount = 0;
            product.id = newProductsList1.length;
            newProductsList1.push(product);
            newState = {...state, cartProducts: newProductsList1 };
            return newState;

        case 'INCREASE_CART_AMOUNT':

            newCartProducts[action.payload.id].cartAmount++;
            newCartProducts[action.payload.id].amount--;
            newState = {...state, cartProducts: newCartProducts, total: (newState.total + Number(action.payload.price)) }
            return newState;

        case 'DECREASE_CART_AMOUNT':
            newCartProducts[action.payload.id].cartAmount--;
            newCartProducts[action.payload.id].amount++;
            newState = {...state, cartProducts: newCartProducts, total: newState.total - Number(action.payload.price)}
            return newState;

        case 'EDITABLE':
            newState.readOnly === true ? newState = {...newState, changedProducts: [...newState.cartProducts]} : newState={...newState, readOnly: true, changedProducts: []}
            return newState;

        case 'REMOVE_FROM_CART':
            let newTotal = newState.total - (newCartProducts[action.payload.id].cartAmount * newCartProducts[action.payload.id].price);
            newCartProducts[action.payload.id].amount += newCartProducts[action.payload.id].cartAmount;
            newCartProducts[action.payload.id].cartAmount -= newCartProducts[action.payload.id].cartAmount;

            newState = {...state, products: newCartProducts, total: newTotal}
            return newState;

        case 'UPDATE_CHANGED_PRODUCT':
            let value = action.payload.target.value;
            typeof action.payload.target.value === "number" ? Number(value) : null;
            console.log(action.payload.target.getAttribute('data-key') + ' = key')
            let newChangedProducts = newState.cartProducts;
            newChangedProducts[action.payload.target.getAttribute('data-key')][action.payload.target.id] = value;
            newState = {...newState, changedProducts: newChangedProducts}
            return newState;

        case 'SUBMIT_CHANGE':
            let newProducts;
            newState.changedProducts.length === 0 ? newProducts = newState.cartProducts : newProducts = newState.changedProducts;

            if(newState.idsToRemove.length>0) {
                let newList = [];
                for (let i = 0; i < newProducts.length; i++) {
                    if(newState.idsToRemove.indexOf(newProducts[i].id) === -1){

                        newList.push(newProducts[i])
                    }

                    console.log(newList, ' = newList')
                }
                for(let i= 0; i<newList.length; i++){

                    newList[i].id = i;
                }

                newProducts = newList;
            }

    newState.changedProducts.length === 0 ? newState = {...newState, changedProducts:  []} : newState = {...newState, cartProducts: newProducts, readOnly: true};

    return newState;


        case 'DELETE_PRODUCT':

            let idsToRemove = newState.idsToRemove;
            idsToRemove.push(action.payload);
            console.log('idstoremove ', idsToRemove)

            newState = {...newState, idsToRemove: idsToRemove}

           return newState;

        default:
            return newState;
    }




}

export default cartReducer;