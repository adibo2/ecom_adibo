import React from 'react'
import { useRouter } from 'next/router'
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import styles from "../../styles/Home.module.scss";
import Head from 'next/head'
import Linko from '../../components/Links/Linko';
import Detailoff from '../../components/Details/Detailsoff';
import { filter_data } from '../../components/UI/content';
import Productoffice from '../../model/Productoffice';
import db from '../../utils/db';
import { useState,useEffect,useContext,useCallback } from 'react';
import Taboffice from '../../components/UI/Taboffice';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import Code from '../../model/code';



const OfficeDetail = ({office,descrp,unused}) => {
//     const router=useRouter();
//     const { officeId }=router.query;
//     const [reviews,Setreview]=useState([]);
//     const [scrollreview,Setscrollreview]=useState(false);

    
//     const handle=async (data)=>{
//       if(!data){
//         return;
//       }
//       if(data){

//         const { firstname, email,rating,note }=data

//         try {
//       await axios.post(`/api/office/${office._id}`, {
//         firstname,
//         rating,
//         email,
//         note,
//       });
//       // console.log(data)
      
//       Setreview(prev=>{
//         const updategoals = [...prev];
//         updategoals.unshift(data)
//         return updategoals;

//       })
//       reviewhandler()


//     } catch (err) {
//       console.log(err);
//     }
  
//       }

//     }
//     const reviewhandler=useCallback(async ()=>{
//       try {
   
//         const { data } = await axios.get(`/api/office/${office._id}`);
//         Setreview(data.reviews)


//         console.log(data.reviews.length)
//       } catch (err) {
//         console.log(err);
//       }
      
      
//     })
//     useEffect(()=>{
//       async function fetchBooks() {

//         const { data } = await axios.get(`/api/office/${office._id}`);
//         Setreview(data.reviews)


//     }
//     fetchBooks();
      

//     },[])
 
//   useEffect(() =>  {
//    handle();
// },[handle]);
// const scrollhandler=()=>{
//   Setscrollreview(true)
//   console.log(scrollreview)
// }

const router = useRouter();
const [reviews, setReviews] = useState([]);
const [scrollreview, setScrollreview] = useState(false);

const { officeId } = router.query;

useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`/api/office/${office._id}`);
      setReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  })();
}, []);

const handle = useCallback(
  async (data) => {
    if (!data) {
      return;
    }

    const { firstname, email, rating, note } = data;

    try {
      await axios.post(`/api/office/${office._id}`, {
        firstname,
        rating,
        email,
        note,
      });
      setReviews((prev) => {
        const updateGoals = [...prev];
        updateGoals.unshift(data);
        return updateGoals;
      });
    } catch (err) {
      console.log(err);
    }
  },
  []
);

const scrollHandler = useCallback(() => {
  setScrollreview(true);
}, []);


  return (
    <>
    <Head>
      <title>{office.title}</title>
      <meta name='description' content={office.meta} />
    </Head>
     <div className={styles.container}>

    <Navbar></Navbar>
    <Filter></Filter>
    <Linko href="/microsoft_office" log="Microsoft Office" product={office.slug}></Linko>

    <Detailoff onScroll={()=>scrollHandler()} id={officeId}  img={office.img} name={office.slug} office={office} alt={office.alt}
        notprice={office.notprice} price={office.price} numReviews={reviews.length} stock={unused}></Detailoff>
        {/* <h1>hello {officeId} </h1>
        <Image src={office.img} width={230} height={270} alt="windows Keys" />
        <h1>{office.name}</h1> */}
        <Taboffice scollhandler={scrollHandler} data={descrp[0].data} reviewtaille={reviews.length} scrolldown={scrollreview} scrollreview={scrollreview} buy={descrp[0].data[0].buy} onsubmit={handle}
        //  onReview={reviewhandler} 
         alt={office.alt} reviews={reviews} ></Taboffice>
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
    const codeunused=await Code.findOne({type:officeId}).lean();
    console.log(codeunused);
    const result = {};
      const type = codeunused.type;
      result[type] = {
        total: codeunused.codes.length,
        unused: 0,
      }
      
      for (let j = 0; j < codeunused.codes.length; j++) {
        if (!codeunused.codes[j].isUsed) {
          result[type].unused++;
        }
      }
      office.stock=result[officeId].unused;

    await db.disconnect();
    // console.log(ObjectId(product._id))

    return {
      props: {
        office: office ? db.convertDocToObj(office) : null,
        descrp:descrp,
        unused:result[officeId].unused

        
      },
    };
  }

export default OfficeDetail