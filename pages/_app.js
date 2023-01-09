import '../styles/globals.scss'
import FilterCtx from '../components/Filterctx/FilterCtx'
import FilterProvider from '../components/Filterctx/FilterProvider'
import CartProvider from '../components/Cartctx/CartProvider'
import "./../components/UI/Tab.css";
import { useRouter } from 'next/router';
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



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

function MyApp({ Component, pageProps:{ session, ...pageProps } }) {
  return(
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
  if (adminOnly && !session.user) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default MyApp
