import React from 'react'
import css from 'styled-jsx/css'
import Filter from '../../components/Filter/Filter'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Refundx from '../../footc/Refund'
import styles from "./../../styles/Home.module.scss"

const Refund = () => {
  return (
    <div >
    <Navbar></Navbar>
    <Filter></Filter>
    <Refundx></Refundx>
    <Footer></Footer>
    </div>
  )
}

export default Refund