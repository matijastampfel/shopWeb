import React, { Component } from 'react';
import '../App.css';
import Form from './Form';
import Products from './Products';
import Cart from './Cart'
import Menu from './Menu'
import History from './History'
import {connect} from 'react-redux';
import {
    setName,
    setPrice,
    setAmount,
    setImage,
    pushToDatabase
} from '../actions/formActions.js';
import{
    updateProductsState,
    addNewProduct,
    editable,
    submitChange,
    updateChangedProduct,
    deleteProduct,
    regretAction
}
 from '../actions/productsActions.js';

import
    {increaseCartAmount,
     decreaseCartAmount,
    removeFromCart
}
from '../actions/cartActions.js';
import {
    changeView,
    LogIn,
    LogOut
} from '../actions/menuActions'
import * as firebase from 'firebase';
import config from '../firebase';
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.returnView = this.returnView.bind(this);
    }

     returnView(){
        
        let viewToReturn;


return viewToReturn;

}
  render() {
    return (
      <div className="container">
          <Menu LogIn={this.props.LogIn} LogOut={this.props.LogOut} view={this.props.view} changeView={this.props.changeView}/>

          {this.props.view.view === 'productsview' ? (<Products deleteProduct = {this.props.deleteProduct} authenticated = {this.props.view.authenticated} updateProductsState={this.props.updateProductsState} productsState={this.props.productsState} //
                                                               increaseCartAmount={this.props.increaseCartAmount} editable={this.props.editable}
                                                               submitChange={this.props.submitChange} updateChangedProduct={this.props.updateChangedProduct} />)
              : null}

          {this.props.view.view === 'formview' ? (console.log('form should display'), <Form formState={this.props.form} setName={this.props.setName} setPrice={this.props.setPrice}
                    setAmount={this.props.setAmount} setImage={this.props.setImage} addNewProduct={this.props.addNewProduct}
                    pushToDatabase={this.props.pushToDatabase}/>)
              : null}



          {this.props.view.view === 'cartview' ?

              (<Cart cartState={this.props.cartState} increaseCartAmount={this.props.increaseCartAmount}
              decreaseCartAmount={this.props.decreaseCartAmount} removeFromCart={this.props.removeFromCart}/>)
              :null}

          {this.props.view.view === 'historyview' ?

              (<History historyState={this.props.historyState} regretAction={this.props.regretAction}/>)
              :null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        form: state.formReducer,
        productsState: state.productsReducer,
        cartState: state.cartReducer,
        view: state.menuReducer,
        historyState: state.historyReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (event) => {
            dispatch(setName(event))

        },

        setPrice: (event) => {
            dispatch(setPrice(event))
        },

        setAmount: (event) => {
            dispatch(setAmount(event))
        },

        pushToDatabase: (productObject) => {

            dispatch(pushToDatabase(productObject))
        },

        updateProductsState: () => {

            dispatch(updateProductsState())
        },

        addNewProduct: (productObject) => {
            dispatch(addNewProduct(productObject))
        },

        increaseCartAmount: (productObject) => {

            dispatch(increaseCartAmount(productObject))
        },

        decreaseCartAmount: (productObject) => {

            dispatch(decreaseCartAmount(productObject))
        },

        removeFromCart: (productObject) => {

            dispatch(removeFromCart(productObject))
        },

        editable: () => {

            dispatch(editable())
        },

        submitChange: (productObject) => {
            dispatch(submitChange(productObject))
        },

        updateChangedProduct: (event) => {

            dispatch(updateChangedProduct(event))
        },

        changeView: (event) => {

            dispatch(changeView (event))

        },

        setImage: (event) => {

            dispatch(setImage (event))
        },

        LogIn: () => {

            dispatch(LogIn())

        },

        LogOut: () => {

            dispatch(LogOut())

        },

        deleteProduct: (key) => {

            dispatch(deleteProduct(key))

        },

        regretAction: (key) => {

            dispatch(regretAction(key))

        }

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

