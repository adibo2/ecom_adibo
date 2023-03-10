import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Filter from "../../components/Filter/Filter";
import styles from "../../styles/Home.module.scss";
import Head from "next/head";
import db from "../../utils/db";
// import Product from '../model/Product';
import Navbar from "../../components/Navbar/Navbar";
import Linko from "../../components/Links/Linko";
import Detail from "../../components/Details/Detail";
import Tabo from "../../components/UI/Tab";
import { filter_data } from "../../components/UI/content";
import Footer from "../../components/Footer/Footer";
import Product from "../../model/Product";
import axios from "axios";
import Code from "../../model/code";

const WindowsDetails = ({ product, descrp, unused,reviewsF }) => {
  //     const router=useRouter();
  //     const [reviews,Setreview]=useState([]);
  //     const [scrollreview,Setscrollreview]=useState(false);

  //     const { winId }=router.query;
  //     const handle=useCallback(async (data)=>{
  //       if(!data){
  //         return;
  //       }
  //       if(data){

  //         const { firstname, email,rating,note }=data

  //         try {
  //       await axios.post(`/api/product/${product._id}`, {
  //         firstname,
  //         rating,
  //         email,
  //         note,
  //       });
  //       // console.log("data"+data)
  //       // const  datax = await axios.get(`/api/product/${product._id}`);

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

  //     })
  //     const getdata=async ()=>{
  //       const { data } = await axios.get(`/api/product/${product._id}`);
  //       Setreview(data.reviews)

  //     }
  //     useEffect(()=>{
  //        getdata();
  //     },[])
  //     const reviewhandler=useCallback(async ()=>{
  //       try {

  //         const { data } = await axios.get(`/api/product/${product._id}`);
  //          Setreview(data.reviews)
  //         // console.log("data"+data)

  //         // console.log(data.reviews.length)
  //       } catch (err) {
  //         console.log(err);
  //       }

  //     },[handle])
  //     useEffect(()=>{
  //       async function fetchBooks() {

  //         const { data } = await axios.get(`/api/product/${product._id}`)
  //         Setreview(data.reviews)
  //     }
  //     fetchBooks();

  //     },[])

  //   useEffect(() =>  {
  //    handle();
  // },[handle]);
  // const scrollhandler=()=>{
  //   Setscrollreview(true)
  // }
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [scrollreview, setScrollreview] = useState(false);

  const { winId } = router.query;



  const handle = useCallback(async (data) => {
    if (!data) {
      return;
    }

    const { firstname, email, rating, note } = data;

    try {
      await axios.post(`/api/product/${product._id}`, {
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
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/product/${product._id}`);
        setReviews(data.reviews);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [handle]);

  const scrollHandler = useCallback(() => {
    setScrollreview(true);
  }, []);

  return (
    <>
      <Head>
      <meta charset="UTF-8" />
        <title>{product.title}</title>
        <meta name="description" content={product.meta} />
        <meta name="keywords" content={product.slug} />
        <meta property="product:brand" content={product.slug} />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="instant" />
        <meta property="product:category" content="Software" />
        <meta
          property="product:title"
          content={product.slug}
        />


        <meta
          property="product:description"
          content={product.meta}
        />

<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
      </Head>
      <div className={styles.container_detail}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Linko href="/windows" log="Windows" product={product.slug}></Linko>

        <Detail
          onScroll={() => scrollHandler()}
          id={winId}
          img={product.img}
          name={product.slug}
          product={product}
          alt={product.alt}
          notprice={product.notprice}
          // numReviews={reviews.length}
          numReviews={reviewsF.length}
          price={product.price}
          // stock={product.stock}
          stock={unused}
        ></Detail>

        <Tabo
          scollhandler={scrollHandler}
          scrolldown={scrollreview}
          scrollreview={scrollreview}
          data={descrp[0].data}
          reviewtaille={reviewsF.length}
          onsubmit={handle}
          // onReview={reviewhandler}
          alt={product.alt}
          reviews={reviews}
        ></Tabo>

        <Footer></Footer>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  // const { params } = context;
  // const { slug } = params;
  const winId = context.params.winId.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());;

  const descrwindows = filter_data.filter((el) => el.id === winId);

  await db.connect();
  const [product, codeunused] = await Promise.all([
    Product.findOne({ slug: winId }).lean(),
    Code.findOne({ type: winId }).lean(),
  ]);


  const result = {};
  const type = codeunused.type;
  result[type] = {
    total: codeunused.codes.length,
    unused: 0,
  };

  for (let j = 0; j < codeunused.codes.length; j++) {
    if (!codeunused.codes[j].isUsed) {
      result[type].unused++;
    }
  }
  console.log(product._id);

  const res = await fetch(`https://www.microsoftkeymarket.com/api/product/${product._id}`);
  const data = await res.json();

  console.log("lmfdsmlfklskflskflsfsjfksfjksfjslkfjsk");
  console.log(result);
  product.stock = result[winId].unused;
  await db.disconnect();
  // console.log(ObjectId(product._id))

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
      descrp: descrwindows,
      reviewsF: data.reviews,
      unused: result[winId].unused,
    },
  };
}

export default WindowsDetails;
