import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Filter from '../components/Filter/Filter'
import styles from "../styles/Home.module.scss";
import Infox from '../components/info/Infox';
import Main from '../components/Main/Main';
import MainPage from '../components/Main/Main';
import NavSeller from '../components/Main/NavSeller';
import Footer from '../components/Footer/Footer';
import Head from "next/head";
import MainSeller from '../components/Main/MainSeller';


const App = () => {
  return (
    <>
    <Head>
        <title>Buy Software Keys Online, Keys Software | Instant Key</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="If you are looking for a genuine site to buy software keys windows 10 or 11 Professional or microsoft office  online, you have come to the right place. Instant Key provides a wide range of keys for different paid software at the lowest price."
        />


        <meta property="og:site_name" content="Instant software key" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
       <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Infox></Infox>
        <MainPage></MainPage>
        <NavSeller></NavSeller>
        <MainSeller></MainSeller>
        <Footer></Footer>
        

    </div>
    </>
  )
}

export default App