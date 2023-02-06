import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Filter from '../components/Filter/Filter'
import styles from "../styles/Home.module.scss";
import Infox from '../components/info/Infox';
import MainPage from '../components/Main/Main';
import NavSeller from '../components/Main/NavSeller';
import Footer from '../components/Footer/Footer';
import Head from "next/head";
import MainSeller from '../components/Main/MainSeller';


const App = () => {
  return (
    <>
    <Head>
    <meta charset="UTF-8" />
        <title>Microsoft Key Market | Authentic Windows and Office Keys</title>
        <meta
          name="description"
          content="If you are looking for a genuine site to buy software keys windows 10 or 11 Professional or microsoft office  online, you have come to the right place.we have it all. Find the perfect match for your needs and budget today. Simple call to action to shop now."
        />
          <meta name="keywords" content="Windows, Operating System, Microsoft, PC,Microsoft Office, Office Suite" />
          <meta name="googlebot" content="index, follow"></meta>
          <meta name="robots" content="index, follow"></meta>

        <meta property="og:site_name" content="Instant software key" />
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