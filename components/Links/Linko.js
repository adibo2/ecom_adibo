import React from 'react'
import Link from 'next/link'
import {AiFillHome} from "react-icons/ai"
import {HiChevronRight} from "react-icons/hi";
import css from './Linko.module.scss';

const Linko = (props) => {
  return (
    <nav className={css.Linko}>
        <div className={css.Linko__flex}>
        <Link href="/" className={css.link}>
            <AiFillHome className={css.svgs}></AiFillHome>
            <span style={{paddingLeft:".3rem"}} className={css.span}>Home</span>

        </Link>
        <HiChevronRight className={css.svgs} color='rgb(55 65 81 / 1)' ></HiChevronRight>

        <Link href={props.href} className={css.link}>
           
            <span style={{paddingLeft:".3rem"}} className={css.span}>{props.log}</span>

        </Link>
        <HiChevronRight className={css.svgs} color='rgb(55 65 81 / 1)' ></HiChevronRight>
        <span>
            {props.product}
        </span>


        </div>
        
    </nav>
  )
}

export default Linko