import React from "react";
import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Office/Productoff";
import db from "../../utils/db";
import styles from "./../../styles/Home.module.scss";
import Head from "next/head";
import Productoffice from "../../model/Productoffice";
import Code from "../../model/code";

const office = (props) => {
  return (
    <>
      <Head>
        <title>
          Get Your Hands on the Best Microsoft Office Digital Licence - Instant
          software Key
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Find the Best Quality and Price for Microsoft Office Digital Licences, including Office 2019 Home and Business for Mac Digital License, Office 2019 Professional Plus Digital License, Office 2021 Professional Plus Digital License, Office 2021 Home and Business Mac. Fast Delivery Guaranteed. Click to Shop Now!"
        />
        
          <meta name="keywords" content="Microsoft Office License, Office Suite License, Word License, Excel License, PowerPoint License, Outlook License" />

<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
      </Head>

      <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Product products={props.products}></Product>
        <Footer></Footer>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  await db.connect();


  const produits = await Promise.all([
    Productoffice.find().lean(),
    Code.find({}).lean()
  ]);
  const [products, codeWindows] = produits;


  const codeWindowsMap = codeWindows.reduce((map, code) => {
    map[code.type] = code.codes.length;
    return map;
    }, {});
    
    products.forEach(async product => {
    const unused = codeWindowsMap[product.slug] || 0;
    await Productoffice.updateOne({ slug: product.slug }, { stock: unused });
    });


  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

export default office;
