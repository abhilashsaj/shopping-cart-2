import React, { Component } from 'react'

export default class Products extends Component {
    render() {
        const productItems = this.props.products.map( product => (
                <div className="col-md-4" key={product.id}>
                    <div className="thumbnail text-center">
                        <a href={'#'+product.id} onClick={(e) => this.props.handleAddToCart(e, product)}>
                            <img src={'/products/'+product.sku+'_2.jpg'} alt={product.title}/>
                            <p>
                                {product.title}
                            </p>
                        </a>
                        <b>
                            <p>
                            ${product.price}
                            </p>
                            <button className="btn btn-primary" onClick={(e) => this.props.handleAddToCart(e, product)}>Add To Cart</button>
                        </b>
                    </div>
                </div>
            )
        )
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
