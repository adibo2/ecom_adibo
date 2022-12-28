import React from 'react'
import Filter from '../../components/Filter/Filter';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar'
import PrivPolicy from '../../footc/PrivPolicy';
import styles from "../../styles/Home.module.scss";


const Privacy = () => {
  return (
    <div>
    <Navbar></Navbar>
    <Filter></Filter>
    <PrivPolicy></PrivPolicy>
    <Footer></Footer>
    </div>
  )
}

export default Privacy