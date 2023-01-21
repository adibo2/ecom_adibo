import React from 'react'
import { useState } from 'react';
import css from "./ButtonPay.module.scss"
const ButtonPay = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
  
    const handleClick = () => {
      setIsPaying(true);
  
      setTimeout(() => {
        setIsPaying(false);
        setIsPaid(true);
        setTimeout(() => {
          //setIsPaid(false);
        }, 2000);
      }, 2000);
    };
  return (
    <button className={css.button} disabled={isPaying || isPaid} onClick={handleClick}>
    <span className={css.rail}></span>
    <span className={css.icon}></span>
    <span className={css.text}>
      {isPaying ? "Processing" : isPaid ? "Complete" : "Buy Product Now"}
    </span>
  </button>
  )
}

export default ButtonPay