import React, { useContext } from 'react'
import Cartcontext from '../../components/Cartctx/Cartcontext';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import Summary from '../../components/Summary/Summary';
import styles from "./../../styles/Home.module.scss";
import Footer from '../../components/Footer/Footer';
// import Product from '../../model/Product';
import db from '../../utils/db';
import { useRouter } from 'next/router';



 const CartP = (props) => {
  const Cartctx=useContext(Cartcontext);

  return (
    <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Summary></Summary>
        <Footer></Footer>

        
        
    </div>
  )
}



export default CartP;
