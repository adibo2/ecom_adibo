import React from 'react'
import css from './Priv.module.scss'

const Refundx = () => {
  return (
    <>
    <div className={css.Police__title}>
        <h1 className={css.h1}>Refund Policy</h1>
    </div>
    <div className={css.Police__info}>
    <div className={css.Police__info_title}>
        All of the software products we license can be purchased and/or downloaded from our website and from our partners.
         Our partners offer free trial periods so that you can easily evaluate the products before making a purchase decision. 
         The trial period helps you evaluate the product to ensure that the software meets all your needs before you purchase a license.<br></br>
        With the actual purchase of software and approval after payment, your license is activated for sale. After receiving the license,
         you are not entitled to refunds or return. This is because there can be no control whether or not the license has been used or will be used in the future and therefore the right of revocation does not apply here as provided by law.<br></br>
        As an extra service we provide links to the software downloads. These links are links to the software at our official partners and
         we cannot be held responsible for the proper functioning or correct installation on your device. We can therefore not guarantee this, but you can always contact our partners.<br></br>
        <span className={css.span}>We do give a 100% guarantee on activation</span>We do give a 100% guarantee on activation. If a product activation code does not work within 30 days during the activation process (both by phone and online), please contact us via e-mail or our contact page and you will receive a new activation code. 
    </div>

    </div>
    </>
  )
}

export default Refundx;