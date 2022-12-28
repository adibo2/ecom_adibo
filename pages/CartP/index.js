import React, { useContext } from 'react'
import Cartcontext from '../../components/Cartctx/Cartcontext';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import Summary from '../../components/Summary/Summary';
import styles from "./../../styles/Home.module.scss";
import Footer from '../../components/Footer/Footer';



 const CartP = (props) => {
  const Cartctx=useContext(Cartcontext);

  return (
    <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Summary></Summary>
        <Footer></Footer>

        
        
    </div>
  )
}
// export async function getServerSideProps() {

//   return{
//     props:{
//       products:"ahmed"
//     }
//   }
//   console.log(props.products)

// }

export default CartP;
