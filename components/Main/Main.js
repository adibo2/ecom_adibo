import React from 'react'
import { Main } from '../data'
import css from "./Main.module.scss"
import Link from 'next/link'
import Image from 'next/image'

const MainPage = () => {
  return (
    <div className={css.wrapper}>
    <div className={css.main}>
        {Main.map((main)=>(
          <Link  href={main.href} className={css.main_card}>
                  <Image
                  width={230} 
                  height={270}     
                   src={main.image} alt={main.alt}></Image>
                   <h3 className={css.main_card_h3}>{main.text}</h3>
                   <p className={css.main_card_p}>{main.subtext}</p>
                </Link>
        ))}


    </div>

    </div>
  )
}

export default MainPage