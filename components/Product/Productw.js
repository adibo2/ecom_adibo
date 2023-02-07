import React, { useContext, useEffect, useRef, useState } from 'react'
import css from "./Product.module.scss"
import Item from './Item'
import Cartcontext from '../Cartctx/Cartcontext'
import { useRouter } from 'next/router'

const Productw = (props) => {
  const Cartctx=useContext(Cartcontext);
  const router=useRouter()
  console.log("query"+router.pathname)

    const clickhandler=(product)=>{
      console.log("heloo from the cart");
      Cartctx.addItem({
        id:product.slug,
        slug:product.slug,

        price:product.price,
        amount:1,
        img:product.img,
        stock:product.stock
      })
      // console.log(Cartctx.items.name)


    }

  return (
    <main className={css.product}>
      {router.pathname === '/search' ? <div></div>
      :
      <>
      <div className={css.titre}>
        <div className={css.titre_2}>Windows</div>
        <div className={css.titre_3}>showing {props.products.length} products</div>
      </div>
      <hr className={css.hro}></hr>
      
      </>

      }
        <div className={css["product__grid"]}>
            {props.products.map(product=>(
                <Item key={product.id} slug={product.slug} img={product.img} 
                 notprice={product.notprice} stock={product.stock} price={product.price} alt={product.alt} push={product.push}
                onClick={()=>clickhandler(product)}></Item>
             
            ))}

        </div>
    </main>
  )
  
}


export default Productw