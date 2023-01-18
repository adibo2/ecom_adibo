
import React, { useContext,useState } from "react";
import css from "./Summary.module.scss";
import Image from "next/image";
// import p from "./../img/offpp21.webp";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { AiFillCloseCircle } from "react-icons/ai";
import {BsArrowRight} from "react-icons/bs"
import Cartcontext from "../Cartctx/Cartcontext";
import {IoMdArrowDropleft} from "react-icons/io"
import {FaCartPlus} from "react-icons/fa"
import dynamic from 'next/dynamic';
import Link from "next/link";
import {FaCheck} from "react-icons/fa"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Summary = (props) => {
  const {items}=useContext(Cartcontext);
  const Cartctx=useContext(Cartcontext);
  const [count,Setcount]=useState(1);

 
  const onAddCart=(item)=>{
    Setcount(count+1);
    if(item.stock < item.amount){
    toast.error('Sorry. Product is out of stock');
    // Setcount(item.stock)

   }
   else if(item.stock <= item.amount  ){
    toast.error('Sorry. Product is out of stock');
    // Setcount(item.stock)

   }
   else{
    Cartctx.addItem(item);

   }
 
  //  Cartctx.addItem(item);
  //  Setcount(count+1);
  //  console.log("count added"+count)

   
  }
  const onRemove=(id)=>{
    Cartctx.removeItem(id);

}
const onClear=(item,id)=>{
  Cartctx.clear(item,id)
}

  return (
    <>
          <ToastContainer style={{ fontSize: "1.3rem" }} position="bottom-center" limit={1} />

      {items.length > 0 ? 

    <div className={css.pad}>
    <div className={css.succes}>
      <div className={css.succes_icon}>
        <FaCheck ></FaCheck>
      </div>
      <div className={css.succes_message}>
      Product added successufly!
      </div>
      <div className={css.succes_right}>
      <Link href="/windows">
      <button className={css.cart__vide_btn}>
          <IoMdArrowDropleft size="2rem" color="#f7f7f7"></IoMdArrowDropleft>
          RETURN TO SHOP
          <FaCartPlus size="2rem" color="#f7f7f7"></FaCartPlus>

        </button>
        </Link>


      </div>

    </div>

    </div>:<></>
      }
    
    <div className={css.summary}>
      {items.length>0 ? <>

      <div className={css.summary__product}>
        <h1 className={css.h1}>Cart Summary</h1>
        {/**************$$$$$$$$$$  Product $$$$$$$$$$$$$$$$$$$********** */}
        <div className={css.summary__product_title}>
          <h3 className={css.h3_1}>Product</h3>
          <h3 className={css.h3_2}>Price</h3>
          <h3 className={css.h3_3}>Quantity</h3>
          <h3 className={css.h3_4}>Subtotal</h3>
        </div>
        <hr className={css.hr}></hr>
        {items.map((item,index)=>(
        <div key={index} className={css.summary__product_details}>
          <div className={css["summary__product_details-image"]}>
            <AiFillCloseCircle size="2.6rem" className={css.icon} onClick={()=>onClear(item,item.id)}></AiFillCloseCircle>
            <Image src={item.img} width={90} height={80} alt="windows Keys"></Image>           
              <p className={css.p}>{item.name}</p>

          </div>
          <div className={css["summary__product_details-price"]}>${item.price}</div>
          <div className={css["summary__product_details-add"]}>
            <div className={css["content__quantity"]}>
              <p className={css.pp}>
                <span className={css.minus} onClick={()=>onRemove(item.id)}>
                  <AiOutlineMinus />
                </span>
                <span className={css.num}>{item.amount}</span>
                {/* <input className={css.num} type="number" inputMode="numeric" value={item.amount} autoComplete="off" /> */}

                <span className={css.plus} onClick={()=>onAddCart(item)}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
          </div>
          <div className={css["summary__product_details-sub"]}>${(Math.round((item.price * item.amount)*100)/100).toFixed(2)}</div>
        </div>
          
        ))}
        {/**************$$$$$$$$$$  Productmobile $$$$$$$$$$$$$$$$$$$********** */}
        <div className={css.summary__productmobile}>
          {items.map((item,index)=>(
            <div key={index} className={css.summary__productmobile}>
            <div className={css["summary__productmobile-image"]}>
            <AiFillCloseCircle size="2.6rem" className={css.icon} onClick={()=>onClear(item,item.id)}></AiFillCloseCircle>           
            <Image src={item.img} width={90} height={80} alt="windows Keys"></Image>
            </div>
            <hr className={css.hrmobile}></hr>
            <div className={css["summary__productmobile-product"]}>
            <h3 className={css.h3_1}>Product</h3>
            <p className={css.p}>{item.name}</p>
            </div>
            <hr className={css.hrmobile}></hr>
            <div className={css["summary__productmobile-product"]}>
            <h3 className={css.h3_2}>Price</h3>
            <div className={css["summary__product_details-price"]}>{item.price}$</div>

            </div>
            <hr className={css.hrmobile}></hr>
            <div className={css["summary__productmobile-product"]}>
            <h3 className={css.h3_3}>Quantity</h3>
            <div className={css["summary__product_details-add"]}>
            <div className={css["content__quantity"]}>
              <p className={css.pp}>
                <span className={css.minus} onClick={()=>onRemove(item.id)}>
                  <AiOutlineMinus />
                </span>
                <span className={css.num}>{item.amount}</span>
                {/* <input className={css.num} type="number" inputMode="numeric" value={item.amount} autoComplete="off" /> */}

                <span className={css.plus} onClick={()=>onAddCart(item)}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
          </div>

            </div>
            <hr className={css.hrmobile}></hr>

            <div className={css["summary__productmobile-product"]}>
            <h3 className={css.h3_4}>Subtotal</h3>
            <div className={css["summary__product_details-sub"]}>{(Math.round((item.price * item.amount)*100)/100).toFixed(2)}$</div>
            </div>




            </div>
          ))}
        </div>

      </div>
      {/**************$$$$$$$$$$  Cart total $$$$$$$$$$$$$$$$$$$********** */}
      <div className={css.summary__total}>
        <h1 className={css.h1}>Cart total</h1>
        <div className={css.summary__total_prix}>
          <div className={css.flexo}>
            <h4 className={css.h4}>subtotal</h4>
            <h6 className={css.h6}>{Cartctx.items.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)}$</h6>
          </div>
          <hr className={css.hr}></hr>
          <div className={css.flexo}>
            <h4 className={css.h4}>subtotal</h4>
            {/* <h5 className={css.h5}>{Cartctx.totalamount}$</h5> */}
            <h5 className={css.h5}>{Cartctx.items.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)}$</h5>

          </div>
          <Link href="checkout">
        <button className={css.button}>PROCEED TO CHECKOUT
        <BsArrowRight></BsArrowRight>
        </button>

          </Link>
        </div>
      </div>
      </> : 
      <div className={css.cart__vide}>
        <h2 className={css.h2}>Your cart is currently empty</h2>
        <Link href="/windows">
        <button className={css.cart__vide_btn}>
          <IoMdArrowDropleft size="2rem" color="#f7f7f7"></IoMdArrowDropleft>
          RETURN TO SHOP
          <FaCartPlus size="2rem" color="#f7f7f7"></FaCartPlus>

        </button>

        </Link>

      </div>
      }
    </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Summary), { ssr: false });