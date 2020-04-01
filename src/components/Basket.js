import React, { Component } from 'react'

export default class Basket extends Component {

    
    render() {
        const {cartItems}= this.props
        return (
            <div className="alert alert-info">
                {cartItems.length===0?"basket is empty":<div> You have {cartItems.length} products in basket</div>}
            </div>
        )
    }
}
