import React, { Component } from 'react';

export default class Cart extends Component{

    render(){
    console.log(this.props.cartState)
        let liMap = this.props.cartState.cartProducts.map((product, key) => {

            return(


                product.cartAmount > 0 ?
                <div className="cart-product" key={key}>
                    <div className="cart-name-and-price">
                        <span className="cart-name">{product.name}</span>
                        <span>{product.price} $</span>
                    </div>

                    <img alt={product.image} className='cart-image' src={product.image}></img><br/>

                    <div className="amount-div">
                        <span className="cart-amount-span">{product.cartAmount} in cart </span>
                        <div className="increase-decrease-div">
                            {product.amount > 0 ? <button  className = "plus" onClick={() => this.props.increaseCartAmount(this.props.cartState.cartProducts[key])}>+</button> : <button  className = "plus plus-disabled" disabled >+</button>}



                        <button className = "remove-from-cart"onClick={() => this.props.removeFromCart(this.props.cartState.cartProducts[key])}>Remove from cart</button>

                            {product.cartAmount > 1 ? <button className = "minus" onClick={() => this.props.decreaseCartAmount(this.props.cartState.cartProducts[key])}>-</button>
                                :  <button className="minus minus-disabled" disabled>-</button> }

                        </div>
                    </div>
                </div>

                    : null



            )
        })

        return(



            <div className="cart-container">
                <div className="cart-total">Total sum: {this.props.cartState.total} $</div>
                <ul>

                    {liMap}

                </ul>

            </div>

        )

    }


}
