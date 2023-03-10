import React from "react";
import { useRouter } from "next/router";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../styles/Home.module.scss";
import Head from "next/head";
import Linko from "../../components/Links/Linko";
import Detailoff from "../../components/Details/Detailsoff";
import { filter_data } from "../../components/UI/content";
import Productoffice from "../../model/Productoffice";
import db from "../../utils/db";
import { useState, useEffect, useContext, useCallback } from "react";
import Taboffice from "../../components/UI/Taboffice";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Code from "../../model/code";

const OfficeDetail = ({ office, descrp, unused, reviewsF }) => {
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



  const handle = useCallback(async (data) => {
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
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/office/${office._id}`);
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
        <title>{office.title}</title>
        <meta name="description" content={office.meta} />

        <meta name="keywords" content={office.slug} />
        <meta property="product:brand" content={office.slug} />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={office.price} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="instant" />
        <meta property="product:category" content="Software" />
        <meta property="product:title" content={office.slug} />

        <meta property="product:description" content={office.meta} />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        ></meta>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        ></meta>
      </Head>
      <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        <Linko
          href="/microsoft_office"
          log="Microsoft Office"
          product={office.slug}
        ></Linko>

        <Detailoff
          onScroll={() => scrollHandler()}
          id={officeId}
          img={office.img}
          name={office.slug}
          office={office}
          alt={office.alt}
          notprice={office.notprice}
          price={office.price}
          numReviews={reviewsF.length}
          stock={unused}
        ></Detailoff>
        {/* <h1>hello {officeId} </h1>
        <Image src={office.img} width={230} height={270} alt="windows Keys" />
        <h1>{office.name}</h1> */}
        <Taboffice
          scollhandler={scrollHandler}
          data={descrp[0].data}
          reviewtaille={reviewsF.length}
          scrolldown={scrollreview}
          scrollreview={scrollreview}
          buy={descrp[0].data[0].buy}
          onsubmit={handle}
          //  onReview={reviewhandler}
          alt={office.alt}
          reviews={reviews}

        ></Taboffice>
        <Footer></Footer>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  // const { params } = context;
  // const { slug } = params;
  const officeId = context.params.officeId.toString();
  const descroffice = filter_data.filter((el) => el.id === officeId);
  let descrp = JSON.parse(JSON.stringify(descroffice));

  await db.connect();

  const [office, codeunused] = await Promise.all([
    Productoffice.findOne({ slug: officeId }).lean(),
    Code.findOne({ type: officeId }).lean(),
  ]);
  const test = db.convertDocToObj(office);
  console.log(test);
  console.log(office);
  // try{
  //   const { data } = await axios.get(`/pages/api/office/${test._id}`);

  // }
  // catch(err){
  //   console.log(err)
  // }

  console.log(codeunused);
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
  office.stock = result[officeId].unused;
  const res = await fetch(`https://www.microsoftkeymarket.com/api/office/${office._id}`);
  const data = await res.json();

  await db.disconnect();
  // console.log(ObjectId(product._id))

  return {
    props: {
      office: office ? db.convertDocToObj(office) : null,
      descrp: descrp,
      reviewsF: data.reviews,
      unused: result[officeId].unused,
    },
  };
}

export default OfficeDetail;
