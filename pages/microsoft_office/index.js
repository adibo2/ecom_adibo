import React from 'react'
import Filter from '../../components/Filter/Filter';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar'
import Product from '../../components/Office/Productoff';
import db from '../../utils/db';
import styles from "./../../styles/Home.module.scss";
import Head from "next/head";
import Productoffice from '../../model/Productoffice';




const office = (props) => {
  return (
    <>
     <Head>
        <title>Get Your Hands on the Best Microsoft Office Digital Licence - Instant software Key</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Find the Best Quality and Price for Microsoft Office Digital Licences, including Office 2019 Home and Business for Mac Digital License, Office 2019 Professional Plus Digital License, Office 2021 Professional Plus Digital License, Office 2021 Home and Business Mac. Fast Delivery Guaranteed. Click to Shop Now!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <div className={styles.container}>
    <Navbar></Navbar>
    <Filter></Filter>
    <Product products={props.products}></Product>
    <Footer></Footer>
   

  </div>
    </>
   
  )
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Productoffice.find().lean();


  return {
    props: {
      products:products.map(db.convertDocToObj),
    },
  };
}

export default office