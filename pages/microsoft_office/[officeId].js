import React from 'react'
import { useRouter } from 'next/router'
import { data_office } from '../../components/data';
import Image from 'next/image';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import styles from "../../styles/Home.module.scss";
import Head from 'next/head'
import Detail from '../../components/Details/Detail';
import Linko from '../../components/Links/Linko';
import Detailoff from '../../components/Details/Detailsoff';
import Tabo from '../../components/UI/Tab';
import { filter_data } from '../../components/UI/content';
import Productoffice from '../../model/Productoffice';
import db from '../../utils/db';
import { useState,useEffect,useContext,useCallback } from 'react';
import Taboffice from '../../components/UI/Taboffice';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';



const OfficeDetail = ({office,descrp}) => {
    const router=useRouter();
    const { officeId }=router.query;
    const [reviews,Setreview]=useState([]);
    
    const handle=async (data)=>{
      if(!data){
        return;
      }
      if(data){

        const { firstname, email,rating,note }=data

        try {
      await axios.post(`/api/office/${office._id}`, {
        firstname,
        rating,
        email,
        note,
      });
      console.log(data)
      
      Setreview(prev=>{
        const updategoals = [...prev];
        updategoals.unshift(data)
        return updategoals;

      })
    } catch (err) {
      console.log(err);
    }
  
      }

    }
    const reviewhandler=useCallback(async ()=>{
      try {
   
        const { data } = await axios.get(`/api/office/${office._id}`);
        Setreview(data.reviews)


        console.log(data.reviews.length)
      } catch (err) {
        console.log(err);
      }
      
      
    })
    useEffect(()=>{
      async function fetchBooks() {

        const { data } = await axios.get(`/api/office/${office._id}`);
        Setreview(data.reviews)


    }
    fetchBooks();
      

    },[])
 
  useEffect(() =>  {
   handle();
},[handle]);


  return (
    <>
    <Head>
      <title>{office.name}</title>
      <meta name='description' content={office.meta} />
    </Head>
     <div className={styles.container}>

    <Navbar></Navbar>
    <Filter></Filter>
    <Linko href="/microsoft_office" log="Microsoft Office" product={office.title}></Linko>

    <Detailoff id={officeId}  img={office.img} name={office.title} office={office} alt={office.alt}
        notprice={office.notprice} price={office.price} stock={office.stock}></Detailoff>
        {/* <h1>hello {officeId} </h1>
        <Image src={office.img} width={230} height={270} alt="windows Keys" />
        <h1>{office.name}</h1> */}
        <Taboffice data={descrp[0].data} reviewtaille={reviews.length} buy={descrp[0].data[0].buy} onsubmit={handle} onReview={reviewhandler} alt={office.alt} reviews={reviews} ></Taboffice>
        <Footer></Footer>


     </div>
        

    
    </>
  )
}
export async function getServerSideProps(context) {
    // const { params } = context;
    // const { slug } = params;
    const officeId=context.params.officeId.toString();
    const descroffice=filter_data.filter((el)=> el.id === officeId)
    let descrp=JSON.parse(JSON.stringify(descroffice))
    
    
    await db.connect();
    const office = await Productoffice.findOne({ slug:officeId }).lean();
    await db.disconnect();
    // console.log(ObjectId(product._id))

    return {
      props: {
        office: office ? db.convertDocToObj(office) : null,
        descrp:descrp
        
      },
    };
  }
// export async function getStaticProps(context){
//     const offId=context.params.officeId.toString();
//     const officeData=data_office.find((el)=> el.index === offId)
//     const descrwindows=filter_data.filter((el)=> el.id === offId)

//     return{
//         props:{
//             office:officeData,
//             descrp:descrwindows

//         },
//     }

// }
// export async function getStaticPaths() {
//     const paths=data_office.map(off=>{
//         return{params:{officeId:off.index.toString()}}
//     }
    
    
//     )
//     console.log(paths)
//     return{
//         paths,
//         fallback:false
//     }
 

// }
export default OfficeDetail