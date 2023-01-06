import React from 'react'
import css from './Footer.module.scss'
import Image from 'next/image'
import visas from "/public/img/visas.svg";
import master from "/public/img/master.webp"
import discover from "/public/img/discover.svg"
import paypal from "/public/img/paypal.svg"
import Link from 'next/link';



const Footer = () => {
  return (
    <footer className={css.footer}>
        <div className={css.footer__grid}>
            <div className={css["footer__grid-pay"]}>
                <div className={css["footer__grid-pay-title"]}>
                GUARANTEED SAFE CHECKOUT
                </div>
                <Image src={visas} width={40} height={40} alt="windows keys payement with visa"></Image>
                <Image src={master} width={40} height={35} alt="windows keys payement with masterCard"></Image>
                <Image src={discover} width={40} height={55} alt="windows keys payement with discover"></Image>
                <Image src={paypal} width={55} height={65} alt="windows keys payement with paypal"></Image>




            </div>
            <div className={css["footer__grid-links"]}>
              <h2 className={css.h2}>Links for you</h2>
              <ul className={css.ul}>
              <Link href="/CartP">
                <li className={css.li}>Cart</li>

                </Link>

                {/* <li className={css.li}>Checkout</li> */}
                <Link href="/Faq">
                <li className={css.li}>FAQ</li>

                </Link>
                <Link href="/Contact">
                <li className={css.li}>Contact Us</li>

                </Link>
              </ul>

            </div>
            <div className={css["footer__grid-links"]}>
              <h2 className={css.h2}>LEGAL</h2>
              <ul className={css.ul}>
                <Link href="/privacy">
                <li className={css.li}>Privacy Policy</li>
                </Link>
                <Link href="/refund">
                <li className={css.li}>Return & Refund</li>

                </Link>

              </ul>

            </div>
            <div className={css["footer__grid-links"]}>
            <h2 className={css.h2}>CONTACT</h2>
              <ul className={css.ul}>
                <li className={`${css.li} ${css.li_2}`}>ahmedlambda@contact</li>

              </ul>

            </div>
        </div>
        <hr className={css.hr}></hr>
        <div className={css.sous}>
          <span>© 2022 Instant License™. All Rights Reserved. </span>
        </div>
        
    </footer>
  )
}

export default Footer

//Shop with confidence! Secure SSL grade encryption and our Level 1 PCI Payments Processor PayPal guarantees 100% security.
//Immediately after placing the order, you will receive the official product download link and the genuine license activation code.
//No frustrating shipping delays, or queuing in a shop. Instead, get a download link in your mailbox. Install and start using your product right away.