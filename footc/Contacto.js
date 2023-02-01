import React from 'react'
import css from './Contacto.module.scss';
import css1 from "./../payement/Pay.module.scss"
import { useState,useEffect,useRef } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const contact=[{
    id: "r1",
      label: "First Name",
      for: "firstname",
      give: "given-name",
      form: "firstname"
},
{
    id: "r2",
    label: "Email address",
    for: "email",
    give: "email",
    form: "email"
  },
  {
    id: "r3",
    label: "Subject",
    for: "subject",
    give: "off",
    form: "subject"

  }
]


const Contacto = () => {
    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();
 

    const onSubmit = async ({firstname,email,subject,note}) => {
      try {
        await axios.post("/api/sendContact",{
          firstname,
          email,
          subject,
          note
        })
        toast.success("We have received your complaint and our team is working on resolving the issue", {});
        reset();



  
        console.log(data)
  
      } catch (err) {
        console.log(err)

       
      }
  
      // console.log(data);
    };

  return (
    <>
     <ToastContainer
        style={{ fontSize: "1.3rem" }}
        position="bottom-center"
        limit={1}
      />
    <div className={css.head}>
        <div className={css.head_titre}>CONTACT US</div>
    </div>
    
    <div className={css.contact}>
        <div className={css.contact_email}>
            <div className={css.contact_email_title}>Instant License Email address</div>
            <div className={css.emailo}>clientcare@microsoftkeymarket.com</div>

        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.contact_form}>
        {contact.map((ema) => (
            <div className={css1.pay__info_input_email} key={ema.id}>
              <label htmlFor={ema.for} className={css1.label}>
                <span 
                className={`${css1.span} ${
                  errors.firstname || errors.email || errors.subject
                    ? css1.invalid__label
                    : ""
                } `}
                >
                  {ema.label}
                  </span>
                <span className={css1.xo}>*</span>
              </label>
              <input
              {...register(ema.form,{required:true})}         
                id={ema.for}
                name={ema.for}
                type="text"
                className={`${css1.input} ${
                  errors.firstname || errors.email || errors.subject
                    ? css1.invalid__input
                    : ""
                } `}
                autoComplete={ema.give}
              ></input>
               {/* {!errors.firstname || errors.firstname && <span>*full name required</span>}
              {!errors.email || errors.email && <span>*email required</span>}
              {!errors.subject || errors.subject && <span>*subject required</span>}
              {errors.note && <span>*Name fileld required</span>} */}
            </div>
          ))}
           <div className={css1.pay__info_input_email}>
             <label htmlFor="note" className={css1.label}>
               <span className={css1.span}>Order notes (optionnal)</span>
               <span className={css1.xo}>*</span>

             </label>
             <textarea
              {...register('note',{required:true})}         

               id="note"
               rows={8}
               name="note"
               type="text"
               className={`${css1.input} ${
                errors.note
                  ? css1.invalid__input
                  : ""
              } `}
              
               autoComplete="off"
             ></textarea>
            

           </div>
           <div className={css1.terms}>
          <input type="checkbox" className={css1.terms_check}/>
          <div className={css1.terms_text}>I consent to having this website store my submitted information so they can respond to my inquiry<span className={css1.xo}>*</span></div>
        </div>
        <button type="submit" className={css.button}>Send message</button>

        </form>
    </div>
    </>
  )
}

export default Contacto