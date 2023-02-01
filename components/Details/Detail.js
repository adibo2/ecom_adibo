import React, { useContext,useState } from "react";
import Image from "next/image";
import css from "./Detail.module.scss";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import message from "/public/img/New-Message.webp";
import { avantages_windows } from "./avantages";
import visas from "/public/img/visas.svg";
import master from "/public/img/master.webp"
import discover from "/public/img/discover.svg"
import paypal from "/public/img/paypal.svg"
import css1 from "./../Footer/Footer.module.scss"
import { useRouter } from "next/router";
import { avantage_office } from "./avantages";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link as Linko } from 'react-scroll';



import { AiOutlineMinus, AiOutlinePlus,AiOutlineShoppingCart } from 'react-icons/ai';
import Cartcontext from "../Cartctx/Cartcontext";


const Detail = (props) => {
  const Cartctx=useContext(Cartcontext);
  const [count,Setcount]=useState(1);
  
  const router = useRouter();
  // const {}=router.query
  // console.log("router"+id);


   const clickhandler= async (product)=>{
   
    console.log(props.stock)
    console.log(count);

    console.log("heloo from the cart");
    Cartctx.addDetail({
      id:product.slug,

      slug:product.name,
      price:product.price,
      amount:count,
      // count:count,
      img:product.img,
      subtotal:(Math.round(product.price * count) * 100 /100),
      stock:product.stock
    },count)
    router.push('/CartP')
    


  }
  const addhandler=()=>{
    Setcount(count+1);
    if (props.stock < count + 1) {
       toast.error('Sorry. Product is out of stock');
       Setcount(props.stock)
    }

  }
  


  return (
    <>
      <ToastContainer style={{ fontSize: "1.3rem" }} position="bottom-center" limit={1} />

    <div className={css.details}>
      <div className={css.image}>
        <Image
          src={props.img}
          width={260}
          height={56}
          layout='responsive'
          alt={props.alt}

        />
      </div>
      <div className={css.content}>
        <h1 className={css.content__h1}>
          {props.name}
        </h1>
        <div className={css.content_review}>
          <Rating
            className={css.stars}
            name="half-rating-read"
            defaultValue={5}
            size="large"
            readOnly
          />
          <Linko data-text="reviews" to="reviews" smooth={true} spy={true} offset={-150} duration={1500}>
        <p onClick={props.onScroll} className={css.content_review_p}>({props.numReviews} reviews)</p>
          
          </Linko>


        </div>
        {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*price $$$$$$$$$$$$$$$$$$$$$*/}

        <div className={css["content__price"]}>
          <div className={css.prix}>${props.notprice}</div>
          <div className={css["prix-promo"]}>${props.price}</div>
        </div>
        <div className={css["content__features"]}>License Features:</div>
        {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*Avanatage $$$$$$$$$$$$$$$$$$$$$*/}
        <div className={css["content__avantages"]}>
          {avantages_windows.map((win) => (
            <div className={css.avantage} key={win.id}>
              <div className={css.flexi}>
                <div className={`${css.image} ${css.image__ava}`}>
                  <Image
                    src={win.img}
                    width={45}
                    height={45}
                    alt={props.alt}
                  />
                </div>
                <div className={css.name}>{win.name}</div>
              </div>
            </div>
          ))}
        </div>
        {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*message $$$$$$$$$$$$$$$$$$$$$*/}
        <div className={css["content__message"]}>
          <Image src={message} width={30} height={25} alt="message windows liscence"></Image>
          <div className={css.content__message__sms}>Get this activation license and the software immediately after payment.</div>

        </div>
         {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*quantity $$$$$$$$$$$$$$$$$$$$$*/}
         <div className={css["content__quantity"]}>
            <h3 className={css.h3}>Quantity:</h3>
            <p className={css.pp}>
            {/* Cartctx.items.length===0 ? props.addhandler() :()=>onAddCart(Cartctx.items) */}
              <span className={css.minus} onClick={()=>{count > 1 ? Setcount(count-1) : 1}}><AiOutlineMinus /></span>
              <span className={css.num}>{count}</span>
              <span className={css.plus} onClick={()=>addhandler()}><AiOutlinePlus /></span>
            </p>
          </div>
            <span className={css.stock}>Stock : {props.stock}</span>
                   {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*buttons $$$$$$$$$$$$$$$$$$$$$*/}
          <div className={css["content__buttons"]}>
            <button type="button" className={css["add-to-cart"]} onClick={()=>clickhandler(props.product)}>
              <span className={css.spanbutton}></span>
              <AiOutlineShoppingCart />
              Add to Cart
              </button>
            {/* <button type="button" className={css["buy-now"]}>
              <AiFillDollarCircle />              
              Buy Now</button> */}
          </div>


             {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*safecheckout $$$$$$$$$$$$$$$$$$$$$*/}
         <div className={`${css1["footer__grid-pay"]} ${css["content__wh"]}`}>
                <div className={`${css1["footer__grid-pay-title"]} ${css.titre}`}>
                GUARANTEED SAFE CHECKOUT
                </div>
                <Image src={visas} width={40} height={40} alt="windows keys payement with visa"></Image>
                <Image src={master} width={40} height={35} alt="windows keys payement with masterCard"></Image>
                <Image src={discover} width={40} height={55} alt="windows keys payement with discover"></Image>
                <Image src={paypal} width={55} height={65} alt="windows keys payement with paypal"></Image>

            </div>
            <div className={css.category}>
            Category : Operating System
            </div>
      </div>
    </div>
    </>
  );
};

export default Detail;
