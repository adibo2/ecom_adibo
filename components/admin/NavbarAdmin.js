import React, { useState } from 'react'
import css from "../admin_style/dashboard.module.scss"
import Link from 'next/link'
import { set } from 'mongoose'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const NavbarAdmin = () => {
  const router=useRouter();

  const [selected, Setselected] =useState(1);
 
  const data=[
    {
    href:"/admin/dashboard",
    name:"dashboard"
  },
  {
    href:"/admin/orders",
    name:"Order"
  },
  {
    href:"/admin/productOffice",
    name:"ProductOffice"
  },
  {
    href:"/admin/productWindows",
    name:"ProductWindows"
  },
  {
    href:"/admin/users",
    name:"User"
  },
]
  return (
    <div className={css.ulcenter}>
      <div>
        <ul className={css.ul}>
          {data.map((item,i)=>(
        <Link  href={item.href}>
          <li className={`${css.li} ${router.pathname === item.href ? css.active : ''}`}>{item.name}</li>
        </Link>

          ))}
      </ul>
        
      </div>
    </div>
  )
}

export default NavbarAdmin