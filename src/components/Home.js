import React from 'react'
import { CartState } from '../context/Context'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './Style.css'


const Home = () => {

  const{
    state: {product},
    productState: {sort, byStock, byFastDelivery, byRating, searchQuery},
  } = CartState();

  const transfromProducts = () => {
    let sortedProducts = product;

    if(sort) {
    sortedProducts = sortedProducts.sort((a, b)=> sort === "lowToHigh" ? a.price - b.price : b.price-a.price);
  }

  if(!byStock){
    sortedProducts = sortedProducts.filter((prod)=> prod.instock);
  }

  if(byFastDelivery){
    sortedProducts = sortedProducts.filter((prod)=> prod.fastDelivery);

  } 
  
  if(byRating){
    sortedProducts = sortedProducts.filter((prod)=> prod.rating >= byRating);
  } 

  if(searchQuery){
    sortedProducts = sortedProducts.filter((prod)=> prod.name.toLowerCase().includes(searchQuery));
  }

  return sortedProducts; }


  return (
 <div className='home'>
      <Filters />
      <div className="productContainer">
      {transfromProducts().map((prod) => {
        return <SingleProduct prod={prod} key={prod.id} /> })}
      </div> 
 </div>
  )
}

export default Home;