import React from 'react'
import Image from "next/image";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar/Navbar";
import Productw from "../components/Product/Productw";
import Fetch from '../model/search';
import styles from "../styles/Home.module.scss";
import { data_windows } from "../components/data";
import db from "../utils/db";
import { Html, Main, NextScript } from "next/document";
import Footer from "../components/Footer/Footer";
import Search from "../components/UI/Search";
import Productoff from '../components/Office/Productoff';
import Count from '../components/UI/Count';
import { useRouter } from 'next/router';

const Searchx = (props) => {
  const router = useRouter();

  const { query } = router;
  console.log(query.query)
  console.log("prozdsdllsmdklmsdklkdslmdklkdls :" + props.products)
  

  return (
    <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Count taille={props.countProducts} search={props.searchQuery}></Count>
        {/* <Info></Info> */}
        {query.query.startsWith('wi') &&  <Productw products={props.products}></Productw> }
        {query.query.startsWith('of') &&  <Productoff products={props.products}></Productoff> }
        
        {/* <Productw products={props.products}></Productw> */}
        
        <Footer></Footer>
      </div>
  )
}
export async function getServerSideProps({query}) {
    const searchQuery = query.query || '';
    console.log(searchQuery)
    // const queryFilter = { name: { $regex: /^/i } }

    //   console.log(queryFilter);
      await db.connect();

      const productDocs = await Fetch.find({ name: { $regex: searchQuery, $options: 'i', }}).lean();

      

      const countProducts = await Fetch.countDocuments({ name: { $regex: searchQuery, $options: 'i', }});
      await db.disconnect();
    //   const products = productDocs.map(db.convertDocToObj);
    return {
      props: {
        products:productDocs.map(db.convertSearch),
        countProducts,
        searchQuery
      },
    };
    console.log(props.products);
  }
export default Searchx;


