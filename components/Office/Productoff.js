import React, { useState,useContext } from 'react'
import css from "./Productoff.module.scss"
import { data_office } from '../data'
import Image from 'next/image'
import Item from './Itemoff'
import { useRouter } from 'next/router'
import Filter from '../Filter/Filter'
import Cartcontext from '../Cartctx/Cartcontext'

const Productoff = (props) => {
  const router=useRouter()
  const Cartctx=useContext(Cartcontext);

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
    
    <div className={css.product}>
       {router.pathname === '/search' ? <div></div>
      :
      <>
     <div className={css.titre}>
       <div className={css.titre_2}>Microsoft Office</div>
       <div className={css.titre_3}>showing {data_office.length} products</div>
     </div>
     <hr className={css.hro}></hr>
     
      
      </>

      }
        <div className={css["product__grid"]}>
            {props.products.map(product=>(
                <Item  key={product.id} index={product.index} slug={product.slug} img={product.img} push={product.push}
                 notprice={product.notprice} price={product.price} alt={product.alt}
                onClick={()=>clickhandler(product)}></Item>
             
            ))}

        </div>
    </div>
  )
}

export default Productoff