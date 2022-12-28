import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Filter from '../../components/Filter/Filter';
import Contacto from '../../footc/Contacto';
import Footer from '../../components/Footer/Footer';



const index = () => {
  return (
    <>
    <Navbar></Navbar>
    <Filter></Filter>
    
    <Contacto></Contacto>
    <Footer></Footer>
    
    </>
  )
}

export default index