import React from 'react'
import Filter from '../../components/Filter/Filter';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

import Accordion from '../../components/UI/Accordion';


const Faq = () => {
    

  return (
    <div>
      <Navbar></Navbar>
      <Filter></Filter>
        <Accordion></Accordion>
        <Footer></Footer>

        
    </div>
  )
}

export default Faq