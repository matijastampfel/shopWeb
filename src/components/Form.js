import React, { Component } from 'react';

export default class Form extends Component {

    render(){

        return(
            <div className="form-container">
                <input placeholder='Product name' onKeyUp={this.props.setName} className='setNameInput' type="text"/>
                <input placeholder='Product price' onKeyUp={this.props.setPrice} className='setPriceInput' type="text"/>
                <input placeholder='Number in stock' onKeyUp={this.props.setAmount} className='setAmountInput' type="text"/>
                <input placeholder='Image URL' onKeyUp={this.props.setImage} className='setImageInput' type="text"/>
                <button className="setNewProduct" onClick={() => this.props.addNewProduct(this.props.formState.tempProduct)}>Set New Product</button>
            </div>


        )
    }

}