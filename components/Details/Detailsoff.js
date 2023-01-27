import React from "react";
import Image from "next/image";
import css from "./Detail.module.scss";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState,useContext } from "react";
import message from "/public/img/New-Message.webp";
import { avantages_windows } from "./avantages";
import visas from "/public/img/visas.svg";
import master from "/public/img/master.webp"
import discover from "/public/img/discover.svg"
import paypal from "/public/img/paypal.svg"
import css1 from "./../Footer/Footer.module.scss"
import { useRouter } from "next/router";
import {avantage_office_hb19mac } from "./avantages";
import {avantage_office_21ProP} from "./avantages"
import Cartcontext from "../Cartctx/Cartcontext";
import {avantage_office_19ProP} from "./avantages";
import {avantages_office_mac} from "./avantages";
import {avantage_office_hS} from "./avantages";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMinus, AiOutlinePlus,AiOutlineShoppingCart,AiFillDollarCircle } from 'react-icons/ai';
const Detailoff = (props) => {
  // const router = useRouter();
  // const {}=router.query
  // console.log("router"+id);
  const Cartctx=useContext(Cartcontext);
  const [count,Setcount]=useState(1);
  const router = useRouter();
  const clickhandler=(office)=>{
    console.log("heloo from the cart");
    Cartctx.addDetail({
      id:office.slug,
      slug:office.name,
      price:office.price,
      amount:count,
      // count:count,
      img:office.img,
      stock:props.stock

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
        <div className={css.content__h1}>
          {props.name}
        </div>
        <Stack spacing={1}>
          <Rating
            className={css.stars}
            name="half-rating-read"
            defaultValue={5}
            size="large"
            readOnly
          />
        </Stack>
        {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*price $$$$$$$$$$$$$$$$$$$$$*/}

        <div className={css["content__price"]}>
          <div className={css.prix}>${props.notprice}</div>
          <div className={css["prix-promo"]}>${props.price}</div>
        </div>
        <div className={css["content__features"]}>Applications included:</div>

    {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*App included $$$$$$$$$$$$$$$$$$$$$*/}
    <div className={css["content__avantages-off"]}>
    {/* {router.query.officeId ==
                    "Office 2019 Home and Business for Mac Digital License" &&
                    xmacrequire.map((x, index) => (
                      <div key={index}>{x.name}</div>
                    ))} */}
          {(router.query.officeId == "Office 2019 Home and Business for Mac Digital License" || router.query.officeId =='Office 2021 Home and Business Digital License' || router.query.officeId=='Office 2021 Home and Business Mac')
           && avantage_office_hb19mac.map((win) => (
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
           {(router.query.officeId == "Office 2019 Professional Plus Digital License" || router.query.officeId =='Office 2019 Professional Plus Binding License')
           && avantage_office_19ProP.map((win) => (
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
          {(router.query.officeId == "Office 2021 Home and Student Digital License")
           && avantage_office_hS.map((win) => (
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
          {(router.query.officeId == "Office 2021 Professional Plus Digital License")
           && avantage_office_21ProP.map((win) => (
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
       
       
        <div className={css["content__features"]}>License Features:</div>
        {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*Avanatage $$$$$$$$$$$$$$$$$$$$$*/}
        <div className={css["content__avantages"]}>
          {(router.query.officeId == "Office 2019 Home and Business for Mac Digital License" || 
          router.query.officeId=='Office 2021 Home and Business Mac') ?  avantages_office_mac.map((win) => (
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
          ))
            : avantages_windows.map((win) => (
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
          {/* {avantages_windows.map((win) => (
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
          ))} */}
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
              <span className={css.minus}  onClick={()=>{count > 1 ? Setcount(count-1) : 1}} ><AiOutlineMinus /></span>
              <span className={css.num}>{count}</span>
              <span className={css.plus} onClick={()=>addhandler()}><AiOutlinePlus /></span>

            </p>
          </div>
            <span className={css.stock}>Stock : {props.stock}</span>
                   {/* /$$$$$$$$$$$$$$$$$$$$$$$$$$$*buttons $$$$$$$$$$$$$$$$$$$$$*/}
          <div className={css["content__buttons"]}>
            <button type="button" className={css["add-to-cart"]} onClick={()=>clickhandler(props.office)}>
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
            Category : Microsoft Office
            </div>
      </div>
    </div>
    </>
  );
};

export default Detailoff;
