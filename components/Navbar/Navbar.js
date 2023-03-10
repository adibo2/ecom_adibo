import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./Navbar.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "/public/img/winlogo1.webp";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Cartcontext from "../Cartctx/Cartcontext";
import { AiFillCloseCircle } from "react-icons/ai";
import { gsap } from "gsap/dist/gsap";
import { choix } from "./filter";


const Navbar = () => {

  const dropdown = useRef();
  const [open, Setopen] = useState(false);
  const [active, Setactive] = useState(true);
  const CartCtx = useContext(Cartcontext);
  const [cartItems,setCartItems] =useState(0);
  const [query, setQuery] = useState('');
  const [filterData,setFilterData] = useState([])


    useEffect(()=>{
      setCartItems(CartCtx.items.length)
  
    },[CartCtx.items])

  const toggleclass = () => {
    Setactive(!active);
    Setopen(false);
  };
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  const onClear=(item,id)=>{
    CartCtx.clear(item,id)
  }
  const clickHandler=()=>{
    router.push('/CartP')


  }
  const checkouthandler=()=>{
    router.push('/checkout')
  }


  useEffect(() => {
    gsap.fromTo(
      dropdown.current,
      { y: 10, opacity: 0 },
      { opacity: 1, y: 0, ease: "back(3)", duration: 0.7 }
    );
  }, [open]);
  const searchhandler=()=>{
    router.push(`/search?query=${query}`);


  }
  const changehandler=(e)=>{
    setQuery(e.target.value)
    const searchWord = e.target.value;
    const newfilter=choix.filter((data)=>(
      data.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
    ))
    if(searchWord === ""){
      setFilterData([])
    }
    else{
      setFilterData(newfilter)

    }

  }
  const pushhandler=(item)=>{
    router.push(`/search?query=${item.name}`);

  }


  return (
    <header className={css.Navbar}>
      <Link href="/" className={css["Navbar__logo"]}>
        <Image
          src={logo}
          width={130}
          height={90}
          alt="instant windows keys"
        ></Image>
        {/* <span className={css["Navbar__logo-text"]}>InstantLiscence</span> */}
      </Link>
      <ul className={css["Navbar__nav"]}>
        <li className={css["Navbar__nav-item"]}>
          <div className={css.search}>
            <div className={css["searchToggle"]} onClick={toggleclass}>
              <BsSearch
                className={`${active ? css.osearch : css.clsearch}`}
              ></BsSearch>
              <GrClose
                className={`${active ? css.close : css.opclose}`}
              ></GrClose>
            </div>
            <form onSubmit={submitHandler}
              className={`${css["search-field"]} ${
                !active ? css["search-field-open"] : ""
              }`}
            >
              <div className={`${css["search-field_flex"]}`}>
              <input
                type="text"
                className={css.input}
                placeholder="Search..."
                onChange={changehandler}
              />
              <FaSearch onClick={()=>searchhandler()} className={css.search__input}></FaSearch>

              </div>
            {filterData.length !=0 &&
            
              <div  className={css.dataresults}>
                {filterData.map((item,index)=>(
                  <div onClick={()=>pushhandler(item)} className={css.dataresults_div} key={index}>
                    <p className={css.dataresults_p}>{item.name}</p>
                    </div>

                ))}

              </div>
            }
            </form>
          </div>
        </li>
        {/* <Link href="/CartP"> */}
          <li onClick={()=>clickHandler()} 
            className={css["Navbar__nav-item"]}
            onMouseEnter={() => {
              Setopen(true);
              Setactive(true);
            }}
          >
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
            <div className={css["Navbar__nav-item-amount"]}>
              <span className={css.amount}>{cartItems}</span>
            </div>
          </li>
        {/* </Link> */}
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
                  <div className={css.dropdown__header}>
                    <span>{CartCtx.items.length} Items</span>
                    <Link href="/CartP">View Cart</Link>
                  </div>
                  <div className={css.dropdown__overflow}>
                    
                  {CartCtx.items.map((item,index)=>(
                  <div key={index} className={css.dropdown__liste}>
                    <div className={css.dropdown__liste_item}>
                      <div className={css.dropdown__liste_item_image}>
                        <div className={css.dropdown__closeicon} onClick={()=>onClear(item,item.id)}>
                      <AiFillCloseCircle size="1.5rem"></AiFillCloseCircle>

                        </div>
                      <Image src={item.img} width={80} height={60}></Image>

                      </div>
                      <div className={css.dropdown__liste_item_id}>
                        <p className={css["dropdown__liste_item_id-name"]}>
                          {item.slug}
                        </p>
                        <p className={css["dropdown__liste_item_id-price"]}> {item.amount} x {item.price}$</p>
                      </div>
                    </div>
                    
                    
                    
                  </div>

                  ))}
                  </div>
                    <div className={css.dropdown__total}>
                      <div className={css.dropdown__total_price}>
                        <p className={css.p}>SUBTOTAL</p>
                        <p className={css.p}>{CartCtx.items.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)}$</p>
                      </div>
                      {/* <Link href="checkout"> */}

                      <div onClick={()=>checkouthandler()} className={css.padd}>
                      <button className={css.button}>CHECKOUT</button>

                      </div>
                      {/* </Link> */}
                    </div>
                    
                </>
              ) : (
                <div className={css["menu-item"]}>No product in the cart</div>
              )}
            </div>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
