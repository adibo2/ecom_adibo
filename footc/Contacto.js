import React from 'react'
import css from './Contacto.module.scss';
import css1 from "./../payement/Pay.module.scss"
import { useState,useEffect,useRef } from "react";
import { useForm } from 'react-hook-form';


const contact=[{
    id: "r1",
      label: "First Name",
      for: "fullname",
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <>
    <div className={css.head}>
        <div className={css.head_titre}>CONTACT US</div>
    </div>
    
    <div className={css.contact}>
        <div className={css.contact_email}>
            <div className={css.contact_email_title}>Instant License Email address</div>
            <div className={css.emailo}>ahmedlambda@contact</div>

        </div>
        <form className={css.contact_form}>
        {contact.map((ema) => (
            <div className={css1.pay__info_input_email} key={ema.id}>
              <label htmlFor={ema.for} className={css1.label}>
                <span className={css1.span}>{ema.label}</span>
                <span className={css1.xo}>*</span>
              </label>
              <input
              {...register(ema.form,{required:true})}         
                id={ema.for}
                name={ema.for}
                type="text"
                className={css1.input}
                autoComplete={ema.give}
              ></input>
            </div>
          ))}
           <div className={css1.pay__info_input_email}>
             <label htmlFor="note" className={css1.label}>
               <span className={css1.span}>Order notes (optionnal)</span>
               <span className={css1.xo}>*</span>

             </label>
             <textarea
               id="note"
               rows={8}
               name="note"
               type="text"
              
               className={css1.input}
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