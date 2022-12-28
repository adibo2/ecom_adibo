import React from 'react'
import Filter from '../../components/Filter/Filter';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Pay from '../../payement/Pay';
import styles from "./../../styles/Home.module.scss";


const Checkout = () => {
  return (
    <div className={styles.container}>
    <Navbar></Navbar>
    <Filter></Filter>
    <Pay></Pay>
    <Footer></Footer>

    
    
</div>
  )
}

export default Checkout