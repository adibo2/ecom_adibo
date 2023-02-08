import Head from "next/head";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";
import Productw from "../../components/Product/Productw";
import Product from "../../model/Product";
import styles from "../../styles/Home.module.scss";
import db from "../../utils/db";
import Code from "../../model/code";
import Footer from "../../components/Footer/Footer";

const Windows = (props) => {
  return (
    <>
      <Head>
        {/* <title>All Windows Operating System - Instant software Key</title> */}
        {/* Softwares Key - Buy your software online and start the installation immediately */}
        <meta charset="UTF-8" />
        <title>Shop the Best Windows Licence at the Lowest Prices</title>
        <meta
          name="description"
          content="Shop the best quality and prices on Windows licences for all types. Find the perfect licence for your needs and buy it online today.Plus, our prices are unbeatable. Shop now and save! "
        />
        <meta name="next" content="https://www.microsoftkeymarket.com/microsoft_office"></meta>
      <meta name="keywords" content="Windows License, Microsoft License, Operating System License, PC License" />

      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>

        {/* <meta
          name="description"
          content="Buy Microsoft Windows 11 Professional Product Key for the best price at instant key. Order now and download the activation key instantly"
        /> */}
      </Head>

      <div className={styles.container}>
        <Navbar></Navbar>
        <Filter></Filter>
        {/* <Infox></Infox> */}
        <Productw products={props.products}></Productw>
        <Footer></Footer>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  await db.connect();
  const produits = await Promise.all([
    Product.find().lean(),
    Code.find({}).lean()
  ]);
  const [products, codeWindows] = produits;

//   for (let i = 0; i < codeWindows.length; i++) {
//     let type = codeWindows[i].type;
//     let unused = codeWindows[i].codes.length;
//     console.log(type, unused);
//     for (let j = 0; j < products.length; j++) {
//         if (products[j].slug === type) {
//             // unused -= products[j].stock;
//             products[j].stock = unused;
//             await Product.updateOne({ slug: type }, { stock: unused });
//             break;
//         }
//     }
// }
const codeWindowsMap = codeWindows.reduce((map, code) => {
  map[code.type] = code.codes.length;
  return map;
  }, {});
  
  products.forEach(async product => {
  const unused = codeWindowsMap[product.slug] || 0;
  await Product.updateOne({ slug: product.slug }, { stock: unused });
  });

  return {
    props: {
      products:products.map(db.convertDocToObj),
    },
  };
}
export default Windows;
