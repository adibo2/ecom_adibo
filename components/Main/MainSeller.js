import React, { useContext, useEffect, useRef, useState } from 'react'
import css from './../Product/Product.module.scss'

import Image from 'next/image'
import Cartcontext from '../Cartctx/Cartcontext'
import { useRouter } from 'next/router'
import { Main_seller } from '../data'
import ItemSeller from './ItemSeller'
 

const MainSeller = (props) => {
  const Cartctx=useContext(Cartcontext);

  const router=useRouter()
  console.log("query"+router.pathname)
    // const [add,Setadd]=useState(true);

    
    //     useEffect(()=>{
    //         const timer=setTimeout(()=>{
    //             Setadd(true)

    //         },4000)
    //         return () => clearTimeout(timer);

    //     },[add])

    
    //     const clickhandler=()=>{
    //         Setadd(false)

    //     }
    const clickhandler=(product)=>{
      Cartctx.addItem({
        id:product.slug,
        slug:product.name,
        price:product.price,
        amount:1,
        img:product.img,
        stock:product.stock
      })
      // console.log(Cartctx.items.name)


    }

  return (
    <div className={css.product}>
      {router.pathname === '/search' ? <div></div>
      :
      <>

      
      </>

      }
        <div className={css["product__grid"]}>
            {Main_seller.map(product=>(
                <ItemSeller key={product.index} slug={product.slug} img={product.img} 
                name={product.name} notprice={product.notprice} path={product.path} stock={product.stock} price={product.price} alt={product.alt}
                onClick={()=>clickhandler(product)}></ItemSeller>
             
            ))}

        </div>
    </div>
  )
  
}


export default MainSeller;