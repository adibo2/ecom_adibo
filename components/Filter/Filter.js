import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useContext,
} from "react";

import css from "./Filter.module.scss";
import { data_filter } from "../data";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import FilterCtx from "./../Filterctx/FilterCtx";
import css1 from "./../Navbar/Navbar.module.scss";
import Cartcontext from "../Cartctx/Cartcontext";
import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "/public/img/winlogo1.webp";


gsap.registerPlugin(ScrollTrigger);

const Filter = (props) => {
  // const [categorie, setcategorie] = useState("microsoft_office");
  const cart = useRef();
  const filterCtx = useContext(FilterCtx);
  const [open, Setopen] = useState(false);
  const dropdown = useRef();
  const CartCtx = useContext(Cartcontext);
  const [cartItems, setCartItems] = useState(0);
  const [active, Setactive] = useState(false);
  useEffect(() => {
    setCartItems(CartCtx.items.length);
  }, [CartCtx.items]);

  useEffect(() => {
    gsap.fromTo(
      dropdown.current,
      { y: 10, opacity: 0 },
      { opacity: 1, y: 0, ease: "back(3)", duration: 0.7 }
    );
  }, [open]);
  const toggleIsLoading = () => {
    // 👇️ passed function to setState
    Setactive((active) => !active);
  };
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cart.current, {
        opacity: 1,
        ease: "ease",
        duration: "0.2",
        scrollTrigger: {
          trigger: cart.current,
          markers: false,
          start: "40% 10%",
          end: "bottom 10%",
          toggleActions: "none play none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className={`${css.filter} ${active ? css.active : css.notactive}`}>
      <div className={css.toggle_button} onClick={toggleIsLoading}>
        <span className={css.bar}></span>
        <span className={css.bar}></span>
        <span class={css.bar}></span>
      </div>
      <div className={`${css.filter__flex} ${active ? css.active2 : ""}`}>
        {data_filter.map((filter) => (
          <Link href={filter.url} key={filter.id}>
            <div
              // onClick={() => filterCtx.Setfilter(filter.param)}
              className={`${css.filter__type} 
              
                ${router.pathname === filter.url ? css.categorie : ""} 

                `}
            >
              <Image src={filter.img} width={28} height={25} alt={filter.alt} />
              <p className={css["filter__type-p"]}>{filter.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={css.filter__icon} ref={cart}>
        <Link href="CartP">
          <AiOutlineShoppingCart
            size="1.8rem"
            color="#f7f7f7"
            onMouseEnter={() => Setopen(true)}
          ></AiOutlineShoppingCart>

          <div className={css["filter__icon-amount"]}>
            <span className={css.amount}>{cartItems}</span>
          </div>
        </Link>
        {open && (
          <>
            <div
              className={css.dropdown}
              onMouseEnter={() => Setopen(true)}
              onMouseLeave={() => Setopen(false)}
              ref={dropdown}
            >
              {CartCtx.items.length > 0 ? (
                <>
                  <div className={css1.dropdown__header}>
                    <span>{CartCtx.items.length} Items</span>
                    <Link href="CartP">View Cart</Link>
                  </div>
                  <div className={css1.dropdown__liste}>
                    <div className={css1.dropdown__liste_item}>
                      <div className={css1.dropdown__liste_item_image}>
                      <AiFillCloseCircle></AiFillCloseCircle>
                      <Image src={logo} width={80} height={60}></Image>

                      </div>
                      <div className={css1.dropdown__liste_item_id}>
                        <p className={css1["dropdown__liste_item_id-name"]}>
                          Windows 10 Profesional keyy smls
                        </p>
                        <p className={css1["dropdown__liste_item_id-price"]}>
                          12$
                        </p>
                      </div>
                    </div>
                    
                    
                    
                  </div>
                    <div className={css1.dropdown__total}>
                      <div className={css1.dropdown__total_price}>
                        <p className={css1.p}>SUBTOTAL</p>
                        <p className={css1.p}>234$</p>
                      </div>
                      <Link href="checkout">

                      <div className={css1.padd}>
                      <button className={css1.button}>CHECKOUT</button>

                      </div>
                      </Link>
                    </div>
                    
                </>
              ) : (
              <div className={css1["menu-item"]}>No product in the cart</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
