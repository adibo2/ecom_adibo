import React, { useEffect, useRef, useState } from 'react'

import css from './Product.module.scss'
import Image from 'next/image'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsCartCheckFill} from 'react-icons/bs'
import Router, { useRouter } from 'next/router';



const Item = (props) => {
    // const [add,Setadd]=useState(true);
    const [add,Setadd]=useState(true);
    const router=useRouter();
    const showDetail=()=>{
        console.log(router.query);
        router.push(`/${props.push}/`+props.slug.toLowerCase().replace(/\s+/g, '-'))

    }

    
    // useEffect(()=>{
    //     const timer=setTimeout(()=>{
    //         Setadd(true)

    //     },4000)
    //     return () => clearTimeout(timer);

    // },[add])


    const clickhandler=()=>{
        Setadd(false)
        router.push('/CartP')

    }

  return (
    
    <div className={css["product__card"]} >
    <span className={css.sale}>Sale!</span>
    <div className={css["product__card-image"]}>
        <Image src={props.img} width={230} height={270} alt={props.alt} onClick={showDetail} />

    </div>
    <div className={css["product__card-content"]}>
        <h2>{props.slug}</h2>
    </div>
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
    <div className={css["product__card-btn"]} onClick={props.onClick}>
        <button className={css.button} onClick={()=>{clickhandler();props.onClick}}>
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

export default Item