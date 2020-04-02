import React, { Component } from 'react'
import Products  from "./components/Products";
import Filter from './components/Filter';
import Basket from './components/Basket';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: "",
      sort: "",
      cartItems: [],
      products: [],
      filteredProducts: []
    };
    this.handleChangeSort = this.handleChangeSort.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentWillMount(){
    fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => this.setState({
      products: data,
      filteredProducts:data
    }));
  }
  handleChangeSort(e){
    this.setState({sort: e.target.value});
    this.listProducts();
  }
  handleChangeSize(e){
    this.setState({size: e.target.value});
    this.listProducts();
  }
  handleAddToCart(e, product){
    this.setState( state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false
      cartItems.forEach(item => {
        if(item.id === product.id){
          productAlreadyInCart =true;
          
          item.count++;

        }
      });

      if(!productAlreadyInCart){
        cartItems.push({...product, count:1})
      }
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return cartItems
    })
  }
  listProducts(){
    this.setState(state => {
      if(state.sort !== ''){
        state.products.sort((a,b)=>state.sort==='lowest'?(a.price>b.price?1:-1):(a.price<b.price?1:-1))
      }
      else{
        state.products.sort((a,b)=> a.id<b.id?1:-1)
      }

      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return {filteredProducts:state.products}
    })
  }
  render() {
    return (
        <div className="container">
          <h1>Ecommerce shopping cart application</h1>
          <hr/>
          <div className="row">
            <div className="col-md-8">
              <Filter size = {this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
              handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}/>
              <hr/>
              <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveCart}/>
            </div>
          </div>
        </div>
    )
  }
}

export default App;