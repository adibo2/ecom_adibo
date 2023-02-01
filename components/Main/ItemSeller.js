import React from 'react'
import css from './../Product/Product.module.scss'
import Image from 'next/image'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsCartCheckFill} from 'react-icons/bs'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Rating from '@mui/material/Rating';
const ItemSeller = (props) => {
    const [add,Setadd]=useState(true);
    const router=useRouter();
    const showDetail=()=>{
        console.log(router.query);
        router.push('/'+props.path)

    }
    const clickhandler=()=>{
        Setadd(false)

    }



  return (
    <div className={css["product__card"]} >
    <span className={css.sale}>Sale!</span>
    <div className={css["product__card-image"]}>
        <Image src={props.img} width={230} height={270} alt={props.alt} 
        onClick={showDetail} 
        />

    </div>
    <div className={css["product__card-content"]}>
        <h2>{props.name}</h2>
    </div>
    <div className={css["product__card-flex"]}>
    <div className={css["product__card-price"]}>
        <del className={css.del}>
            <span>
                <bdi>
                    <span className={css.notspanos}>${props.notprice}</span>
                </bdi>
            </span>
        </del>
            <span>
                <bdi>
                    <span className={css.spanos}>${props.price}</span>
                </bdi>
            </span>
    </div>
    <Rating color="red" name="read-only" value={5} size="small" 
    sx={{
        '& .MuiRating-iconFilled': {
          color: '#2c3e50',
        },
        
      }}
    readOnly />
    </div>
    <div className={css["product__card-btn1"]} onClick={props.onClick}>
        <button className={css.button} onClick={()=>{clickhandler();props.onClick}}
         >
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
            Add To Cart
            <div className={`${css.pretext} ${add ? css.done : css.add}`}>
                <div className={css.posttext}>
                    ADDED
                </div>
                    <BsCartCheckFill></BsCartCheckFill>
            </div>
            </button>
    </div>

</div>
  
  )
}

export default ItemSeller