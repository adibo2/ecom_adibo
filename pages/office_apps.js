import React from 'react'
import styles from "../styles/Home.module.scss";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar/Navbar";
import Productw from "../components/Product/Productw";
import Footer from "../components/Footer/Footer";
import css from "./../components/Product/Product.module.scss"

const Office_apps = () => {
  return (
    <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <div className={css.product}>
      <div className={css.titre}>
        <div className={css.titre_2}>Office Apps</div>
      </div>
      <hr className={css.hrout}></hr>
        <h3 className={css.out}>
          Products out of stock

        </h3>
      
    
    </div>
        
        <Footer></Footer>
      </div>
  )
}

export default Office_apps