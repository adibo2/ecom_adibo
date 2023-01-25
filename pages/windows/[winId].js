import React, { useContext, useState,useEffect,useCallback } from 'react'
import { useRouter } from 'next/router'
import Filter from "../../components/Filter/Filter";
import styles from "../../styles/Home.module.scss";
import Head from 'next/head'
import db from '../../utils/db';
// import Product from '../model/Product';
import Navbar from "../../components/Navbar/Navbar";
import Linko from '../../components/Links/Linko';
import Detail from '../../components/Details/Detail';
import Tabo from '../../components/UI/Tab';
import { filter_data } from '../../components/UI/content';
import Footer from '../../components/Footer/Footer';
import Product from '../../model/Product';
import Cartcontext from '../../components/Cartctx/Cartcontext';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';




const WindowsDetails =  ({product,descrp}) => {
    const router=useRouter();
    const Cartctx=useContext(Cartcontext);
    const [reviews,Setreview]=useState([]);
    const [scrollreview,Setscrollreview]=useState(false);

    
    const { winId }=router.query;
    console.log("yea"+winId);
    const handle=useCallback(async (data,date)=>{
      if(!data){
        return;
      }
      if(data){

        const { firstname, email,rating,note }=data

        try {
      await axios.post(`/api/product/${product._id}`, {
        firstname,
        rating,
        email,
        note,
      });
      // console.log("data"+data)
      // const  datax = await axios.get(`/api/product/${product._id}`);

    
      Setreview(prev=>{
        const updategoals = [...prev];
        updategoals.unshift(data)
        return updategoals;

      })
      reviewhandler()
      
    } catch (err) {
      console.log(err);
    }
  
      }

    })
    const getdata=async ()=>{
      const { data } = await axios.get(`/api/product/${product._id}`);
      Setreview(data.reviews)

    }
    useEffect(()=>{
       getdata();
    },[])

    const reviewhandler=useCallback(async ()=>{
      try {
   
        const { data } = await axios.get(`/api/product/${product._id}`);
         Setreview(data.reviews)
         console.log("awdii");
        // console.log("data"+data)
       


        // console.log(data.reviews.length)
      } catch (err) {
        console.log(err);
      }
      
      
    },[handle])
    useEffect(()=>{
      async function fetchBooks() {

        const { data } = await axios.get(`/api/product/${product._id}`)
        Setreview(data.reviews)
    }
    fetchBooks();
      

    },[])
    
 
  useEffect(() =>  {
   handle();
},[handle]);

const scrollhandler=()=>{
  Setscrollreview(true)
  console.log(scrollreview)
}

  return (
    <>
    <Head>
      <title>{product.title}</title>
      <meta name='description' content={product.meta} />
    </Head>
     <div className={styles.container_detail}>

    <Navbar></Navbar>
    <Filter></Filter>
    <Linko href="/windows" log='Windows' product={product.title}></Linko>
        {/* <h1>hello {officeId} </h1>
        <Image src={windows.img} width={230} height={270} alt="windows Keys" />
        <h1>{windows.name}</h1> */}
        <Detail onScroll={()=>scrollhandler()} id={winId}  img={product.img} name={product.title} product={product} alt={product.alt}
        notprice={product.notprice} numReviews={reviews.length} price={product.price} stock={product.stock}></Detail>
        {/* <ToastContainer position="bottom-center" limit={1} /> */}

        <Tabo scollhandler={scrollhandler} scrolldown={scrollreview} scrollreview={scrollreview} data={descrp[0].data} reviewtaille={reviews.length} onsubmit={handle} onReview={reviewhandler} alt={product.alt} reviews={reviews}></Tabo>

        <Footer></Footer>

     </div>
        

    
    </>
  )
}
export async function getServerSideProps(context) {
    // const { params } = context;
    // const { slug } = params;
    const winId=context.params.winId.toString();
    const descrwindows=filter_data.filter((el)=> el.id === winId)
    
    
    await db.connect();
    console.log(descrwindows)
    const product = await Product.findOne({ slug:winId }).lean();
    await db.disconnect();
    // console.log(ObjectId(product._id))

    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
        descrp:descrwindows
        
      },
    };
  }
// export async function getStaticProps(context){
//     const winId=context.params.winId.toString();
//     // await db.connect();
//     const products = await Product.findOne({ slug:winId }).lean();

//     const windowsData=data_windows.find((el)=> el.index === winId)
//     const descrwindows=filter_data.filter((el)=> el.id === winId)
//     // console.log(descrwindows[0].data);
//     // console.log(winId);
//     return{
//         props:{
//             windows:windowsData,
//             descrp:descrwindows
//         },
//     }

// }
// export async function getStaticPaths() {
//     const paths=data_windows.map(win=>{
//         return{params:{winId:win.index.toString()}}
//     }
    
    
//     )
//     console.log(paths)
//     return{
//         paths,
//         fallback:false
//     }
 

// }
export default WindowsDetails