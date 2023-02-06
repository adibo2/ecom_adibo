import '../styles/globals.scss'
import FilterProvider from '../components/Filterctx/FilterProvider'
import Head from "next/head";

import CartProvider from '../components/Cartctx/CartProvider'
import "./../components/UI/Tab.css";
import { useRouter } from 'next/router';
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Script from 'next/script';
import { SessionProvider, useSession } from 'next-auth/react';
const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-GX5RHW5XHG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GX5RHW5XHG');
</script> */}

function MyApp({ Component, pageProps:{ session, ...pageProps } }) {
  return(
    <>
    <Head>
    <meta name="msvalidate.01" content="412C2584AEDECB815DC20AC2B22B9F1A" />
       
        <link rel="icon" href="/win.webp" />
      </Head>
    
    <Script
    id='myscript'
    strategy='lazyOnload'
    src={`https://www.googletagmanager.com/gtag/js?id=G-GX5RHW5XHG`}/>

    <Script
    id='myscript1'
    strategy='lazyOnload'>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GX5RHW5XHG');

    `}
    </Script>

    

    <SessionProvider session={session}>
    <CartProvider>
    <FilterProvider>
      <PayPalScriptProvider deferLoading={true}>
    {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
           </Auth>
          ) : (
            <Component {...pageProps} />
          )}
      </PayPalScriptProvider>
    </FilterProvider>

    </CartProvider>
    </SessionProvider>
    </>


    
    ) 
}
function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default MyApp
