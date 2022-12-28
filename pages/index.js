import Head from "next/head";
import Image from "next/image";
import Filter from "../components/Filter/Filter";
import Info from "../components/info/info";
import Navbar from "../components/Navbar/Navbar";
import Productw from "../components/Product/Productw";
import Product from "../model/Product";
import styles from "../styles/Home.module.scss";
import { data_windows } from "../components/data";
import db from "../utils/db";
import { Html, Main, NextScript } from "next/document";
import Footer from "../components/Footer/Footer";
import Search from "../components/UI/Search";

const App = (props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Softwares Key - Buy your software online and start the installation immediately. 
          Increase your productivity today with the full version of Microsoft products. Buy office 2019 key, windows server 2019 activation key,
          windows 11 pro key, windows 10 key,MICROSOFT Windows 10 Enterprise –INSTANT DELIVERY-,MICROSOFT WINDOWS 11 HOME ,
           microsoft office 2019 home and student, windows 10 ultimate sp1 keys, buy office 2016 key"
        />

        <meta
          name="description"
          content="Buy Microsoft Windows 11 Professional Product Key for the best price at instant key. Order now and download the activation key instantly"
        />
        <meta property="og:site_name" content="Instant software key" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Info></Info>
        <Productw products={props.products}></Productw>
        <Footer></Footer>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  console.log(products.map(db.convertDocToObj));
  return {
    props: {
      products:products.map(db.convertDocToObj),
    },
  };
}
export default App;
