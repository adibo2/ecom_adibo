import React from 'react'
import css from "./Main.module.scss"
const NavSeller = () => {
  return (
    <div className={css.nav}>
        <h1 className={css.nav_h1}>Best Seller</h1>
        <p className={css.nav_p}>Our all-time best sellers loved by many customers and our staff.</p>
    </div>
  )
}

export default NavSeller