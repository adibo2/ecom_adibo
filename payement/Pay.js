import React from "react";
import css from "./Pay.module.scss";
import { useForm} from "react-hook-form";
import { useState,useEffect,useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from "next/image";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Cartcontext from "../components/Cartctx/Cartcontext";
const Pay = () => {
  const datana = [
    {
      id: "a1",
      label: "First Name",
      for: "firstname",
      give: "given-name",
      fo: "firstname"

    },
    {
      id: "a2",
      label: "Last name",
      for: "lastname",
      give: "family-name",
      fo: "lastname"

    },
  ];
  const email = [
    {
      id: "e1",
      label: "Email address",
      for: "email",
      give: "email",
      form: "email",
      message:"Email Address is required"
    },
    {
      id: "e2",
      label: "Repeat Email address",
      for: "repeatemail",
      give: "off",
      form:"repeatemail",
      message:"Repeat Email Address is required"
    },
  ];
  const optional=[{
    id: "op1",
    label: "Company name (optionnal)",
    for:"company",
    holder:"Add this information if you want it to be included on the invoice",
    give:"organization-title"

  },{
    id: "op2",
    label: "Phone (optionnal)",
    holder:"Add this information if you want it to be included on the invoice",
    for:"phone",
    give:"tel"
  },
  {
    id: "op3",
    label:"Country/Region (optionnal)",
    holder:"United States (US)",
    for:"country",
    give:"country-name"
  },
  {
    id: "op4",
    label:"County/State (optionnal)",
    holder:"New York",
    for:"state",
    give:"off"
  },
  {
    id: "op5",
    label:"Street address (optionnal)",
    holder:"Add this information if you want it to be included on the invoice",
    for:"address",
    give:"street-address"
  }
]
const [show,Setshow]=useState(false)

const { register, handleSubmit, watch, formState: { errors } } = useForm();

const  onSubmit = async ({firstname,lastname,email,repeatemail}) => {
  try{
    await axios.post('/api/auth/signup', {
      firstname,
      lastname,
      email,
      repeatemail

    });
    
    toast.success('Information Added Successfully',{
    });
    Setshow(true);

    // console.log(data)

  } catch(err){
    toast.error("Not a valid state");

  }

  // console.log(data);



};
const [scriptLoaded, setScriptLoaded] = useState(false);
const Cartctx=useContext(Cartcontext);

const initialOptions = {
  "client-id": "AUq6Lg5pFbvivP6eTseEb9-d4qBJD-dMiuBzU40b9f-p2EVuxFQnp_vLmrmdnFbAvp_BONyOgrDt8rKH",
  currency: "USD",

};

  return (
    <>
    {!errors.firstname && !errors.lastname && !errors.email && !errors.repeatemail || (
    <div className={css.error}>
      {errors.firstname &&(<span>*Name fileld required</span>)}
      {errors.lastname &&(<span>*Name fileld required</span>)}
      {errors.email &&(<span>*{errors.email?.message}</span>)}
      {errors.repeatemail &&<span>*{errors.repeatemail?.message}</span>}
      {errors.repeatemail &&<span>*{errors.chooseCb?.message}</span>}




    </div>

    )
    
    }
    <ToastContainer style={{ fontSize: "1.3rem" }}  position="bottom-center"  limit={1} />

    <form className={css.pay} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.pay__info}>
        <h1 className={css.h1}>Billing Details</h1>
        <div className={css.pay__info_input}>
          {datana.map((lab) => (
            <div className={`${css.pay__info_input_label} `} key={lab.id}>
              <label htmlFor={lab.for} className={`${css.label} ${errors.firstname || errors.lastname ? css.invalid__label : ""} `}>
                <span className={`${css.span} ${errors.firstname || errors.lastname ? css.invalid__label : ""} `}>{lab.label}</span>
                <span className={css.xo}>*</span>
              </label>
              <input
              {...register(lab.fo,{required:true})}         

                id={lab.for}
                name={lab.for}
                type="text"
                className={`${css.input} ${errors.firstname || errors.lastname ? css.invalid__input : ""} `}
                autoComplete={lab.give}
              ></input>
            </div>
          ))}
          {email.map((ema) => (
            <div className={css.pay__info_input_email} key={ema.id}>
              <label htmlFor={ema.for} className={css.label}>
                <span className={`${css.span} ${errors.email || errors.repeatemail ? css.invalid__label : ""} `}>{ema.label}</span>
                <span className={css.xo}>*</span>
              </label>
              <input
              {...register(ema.form,{required:ema.message, pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              }})}         
                id={ema.for}
                name={ema.for}
                type="text"
                className={`${css.input} ${errors.email || errors.repeatemail ? css.invalid__input : ""} `}
                autoComplete={ema.give}
              ></input>
              <div className={css.warning}>Your digital product will be sent to this email address, please make sure you have access to it</div>
            </div>
          ))}
          {optional.map((opt)=>(
             <div className={css.pay__info_input_email} key={opt.id}>
             <label htmlFor={opt.for} className={css.label}>
               <span className={css.span}>{opt.label}</span>
             </label>
             <input
               id={opt.for}
               name={opt.for}
               type="text"
               placeholder={opt.holder}
               className={css.input}
               autoComplete={opt.give}
             ></input>
           </div>

          ))}
        <h1 className={css.h1}>Additional information</h1>
        <div className={css.pay__info_input_email}>
             <label htmlFor="note" className={css.label}>
               <span className={css.span}>Order notes (optionnal)</span>
             </label>
             <textarea
               id="note"
               name="note"
               type="text"
               placeholder="Notes about your order, e.g. special notes for delivery."
               className={css.input}
               autoComplete="off"
             ></textarea>
           </div>
        </div>


      </div>
      {/* payement */}
      <div className={css.pay__payement}>
        <h1 className={css.h1}>Your order</h1>
        <div className={css.pay__payement_title}>
          <h3 className={css.h3_1}>Product</h3>
          <h3 className={css.h3_2}>Subtotal</h3>
        </div>
        <hr className={css.hr} />
        {Cartctx.items.map((item,index)=>(
          <>
        <div key={index} className={css.pay__payement_details}>
          <div className={css.pay_flex}>
            <Image src={item.img} width={80} height={75}></Image>
          </div>
          <div className={css.pay__payement_details_titre}>
            <h4 className={css.h4}>{item.name} x {item.amount}</h4>
          </div>
          <div className={css.letotal}>${item.price}</div>

        </div>
        <hr className={css.hr} />
          
          </>
        ))}
        <div className={css.pay__payement_details}>
        <h3 className={css.h3_1}>Total</h3>
          <h3 className={css.h3_2_2}>${Cartctx.totalamount}</h3>

        </div>
        <div className={css.terms}>
          <input 
           name="selectCheckbox"
           id="selectCheckbox"
           {...register('chooseCb')}
          type="checkbox" 
          className={css.terms_check}/>
          <label htmlFor="chooseCb" className={css.terms_text}>I agree the terms & refund policy <span className={css.xo}>*</span></label>
        </div>
        <button type="submit"  className={css.button} value="submit"> 
        continue to payement

        </button>
        { show && 
        <>
        <PayPalScriptProvider options={initialOptions} type="submit">
           <PayPalButtons></PayPalButtons>
        </PayPalScriptProvider>

        </>
        }

        
      </div>
    </form>
    
    </>
  );
};

export default dynamic(() => Promise.resolve(Pay), { ssr: false });