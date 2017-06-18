import * as firebase from 'firebase';
const database = firebase.database();

var productsList = [];
var initialProducts = [{name: 'Šipun Žlahtina 2015', price: 7.99, amount: 100, image: 'https://www.thewineandmore.com/media/2936/zlahtina-sipun.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131383996510000000', cartAmount: 0, id: 0},
    {name: 'Tomić Beleca 2015', price: 58, amount: 5, image: 'https://www.thewineandmore.com/media/2262/tomi%C4%87-beleca-2014.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131402800040000000', cartAmount: 0, id: 1},
    {name: 'Matuško Dingač 2011', price: 90, amount: 89, image: 'https://www.thewineandmore.com/media/2834/matusko-dingac.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131419348670000000', cartAmount: 0, id: 2},
    {name: 'Josić Ciconia Nigra Cuvée Superior 2013', price: 90, amount: 49, image: 'https://www.thewineandmore.com/media/2503/josic-couvee-superior.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131413938130000000', cartAmount: 0, id: 3},
    {name: 'Pošip Milan 2016', price: 19, amount: 10, image: 'https://www.thewineandmore.com/media/156740/posip-milan.jpg?anchor=center&mode=crop&width=286&height=364&rnd=131421082170000000', cartAmount: 0, id: 4}];


database.ref('products').on('value', (snapshot) => {

    let data = snapshot.val();


    for (let product in data) {
        productsList.push({
            name: data[product].name,
            price: data[product].price
        })
    }
});

const productsReducer = (state = {

    products: initialProducts,
    previousStates: [],
    readOnly: true,
    editText: 'Edit',
    changedProducts: [],
    editClass: 'edit-button',
    idsToRemove: []
}, action) => {
    let newState = {...state};

    let newPreviousStates;

    let newProductsList2 = state.products;

    switch(action.type){

        case 'UPDATE_STATE':
            let productsList1 = [];

            database.ref('products').on('value', snapshot => {

                let data = snapshot.val();


                for (let product in data) {
                    productsList1.push({
                        name: data[product].name,
                        price: data[product].price,
                        amount: 10,
                        id: productsList1.length-1
                    })
                }
            });

            newState = {...state, products: productsList1}
            return newState;

        case 'ADD_NEW_PRODUCT':

            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})

            let product = action.payload;
            product.id = newProductsList2.length;
            newProductsList2.push(product);
            newState = {...state, products: newProductsList2, previousStates: newPreviousStates}
            return newState;

        case 'INCREASE_CART_AMOUNT':
            newProductsList2[action.payload.id].amount--;
            newProductsList2[action.payload.id].cartAmount++
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'DECREASE_CART_AMOUNT':
            newProductsList2[action.payload.id].amount++;
            newProductsList2[action.payload.id].cartAmount--
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'REMOVE_FROM_CART':
            newProductsList2[action.payload.id].amount += newProductsList2[action.payload.id].cartAmount;
            newProductsList2[action.payload.id].cartAmount -= newProductsList2[action.payload.id].cartAmount;
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'EDITABLE':
        newState.readOnly === true ? newState = {...newState, editClass: 'cancel-edit-button', readOnly: false, editText: 'Cancel edit', changedProducts: [...newState.products]}: newState={...newState, editClass: 'edit-button', readOnly: true, changedProducts: [], editText: 'Edit', idsToRemove: [], products: newState.products}
            return newState;

        case 'UPDATE_CHANGED_PRODUCT':
            console.log(state.products, '= products')
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let value = action.payload.target.value;
            typeof action.payload.target.value === "number" ? Number(value) : null;
            console.log(action.payload.target.getAttribute('data-key') + ' = key')
            let newChangedProducts = newState.products;
            newChangedProducts[action.payload.target.getAttribute('data-key')][action.payload.target.id] = value;
            newState = {...newState, changedProducts: newChangedProducts, previousStates: newPreviousStates, products: [...state.products] }
            return newState;

        case 'SUBMIT_CHANGE':
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let newProducts = newState.changedProducts;
            if(newState.idsToRemove.length>0) {
                let newList = [];
                console.log(newList, 'idsToRemoveIsLongerThan 1', 'newProductslength: ' , newProducts.length)
                for (let i = 0; i < newProducts.length; i++) {
                    if(newState.idsToRemove.indexOf(newProducts[i].id) === -1) {

                        newList.push(newProducts[i])
                    }
                }
                for (let j = 0; j < newList.length; j++) {

                    newList[j].id = j;
                }
                newProducts = newList;
            }

            newState = {...newState, products: newProducts, readOnly: true, editText: 'Edit', previousStates: newPreviousStates, idsToRemove: [] };
            

            return newState;

        case 'DELETE_PRODUCT':
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let idsToRemove = newState.idsToRemove;
            idsToRemove.push(action.payload);
            console.log('idstoremove ', idsToRemove);
            newState = {...newState, idsToRemove: idsToRemove, previousStates: newPreviousStates }



            return newState;


        case 'REGRET_ACTION':
            console.log( newState.previousStates[action.payload-1], ' indexing previous state')
            let beforeState = {...newState.previousStates[action.payload-1]}
            newState = {...beforeState}
         
            return newState;
        default:
                return newState;



    }
}
export default productsReducer;
