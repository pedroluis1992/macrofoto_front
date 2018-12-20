import React,{Component} from 'react';
import ProductCard from '../components/ProductCard';
class Products extends Component{
  render(){
    return(
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap">
          <ProductCard/>

        </div>
      </div>
    );
  }
}
export default Products;