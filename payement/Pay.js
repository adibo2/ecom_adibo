import React, { useContext } from "react";
import css from "./Pay.module.scss";
import { useForm } from "react-hook-form";
import { useState, useEffect,useReducer } from "react";
import { ToastContainer } from "react-toastify";
import { signIn,useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Loader from "../utils/Loader";
import { getError } from "../utils/error";
import {datana,email,optional} from "./dataPay";
import { Fade } from "react-awesome-reveal";
import { useController } from 'react-hook-form';
import pay from "/public/checklist.gif"
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state,loadingx:true, loading: true, error: '' };
      case 'FETCH_START':
        return { ...state, loadingx: false, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
      case 'MODIFY':
      return { ...state,modify:true,update:false,error: '' };
      case 'MODIFY_NOT':
        return { ...state,modify:false,update:true,error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
import Cartcontext from "../components/Cartctx/Cartcontext";
import ButtonPay from "./ButtonPay";
const Pay = () => {
  const [empty,Setempty]=useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isCheckeds, setIsCheckeds] = useState(false)
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [emailx, setEmail] = useState()
  const Cartctx = useContext(Cartcontext);
  const [{loadingx,loading,error,update,order,successPay,loadingPay,loadingDeliver,successDeliver,modify},dispatch] = useReducer(reducer, {
    loading: true,
    loadingx:true,
    modify:false,
    update:false,  
    order: {},
    error: '',
  });


  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


  const [show, Setshow] = useState(false);
  const router = useRouter();
  // const [isChecked, setIsChecked] = useState(false)

  // console.log("router.query"+router.query.id)
  // console.log("orderId"+ orderId);
  const orderId=router.query.id;
  useEffect(()=>{
    if (Cartctx.items.length === 0){
      router.back()

    }
  },[Cartctx])
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    
    formState: { errors },
  } = useForm();

  const isChecked = watch("checkboxName")
  function handleCheckboxChange(event){
    setIsCheckeds(event.target.checked)
    setValue("checkboxName",event.target.checked)
  }

  const onSubmit = async ({ firstname, lastname, email, repeatemail }) => {
    try {
      dispatch({ type: 'FETCH_START' });
      setFirstname(firstname);
      setLastname(lastname);
      setEmail(email);


      console.log(email)
      // e.preventDefault() 
      if(update){
        await axios.put('/api/auth/modify',{
          firstname,
          lastname,
          email,
          repeatemail
        })
        const result = await signIn('credentials', {
          redirect: false,
          email,
          
        });
        if (result.error) {
          toast.error(result.error);
        }
        toast.success('information updated successfully');

      }
      else{
        await axios.post('/api/auth/signup', {
            firstname,
            lastname,
            email,
            repeatemail,
          });
          const result = await signIn('credentials', {
            redirect: false,
            email,
          });
          if (result.error) {
            toast.error(result.error);
          }
          toast.success("Information Added Successfully", {});

      }


      
    const { data }=await axios.post('/api/orders', {
        orderItems: Cartctx.items,  
        totalPrice:Cartctx.items.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2),
      });
     
      
      // Cookies.set('Cart',[]);
      // Cookies.set('total',0)
      
      await axios.post("/api/sendOrder",{
        firstname,
        lastname,
        email
      })

      dispatch({ type: 'FETCH_REQUEST' });
      dispatch({type: 'MODIFY'})

      router.push({
        pathname: router.pathname,
        query: { id: data._id },
      });
      Setshow(true);
      console.log(orderId)

      // console.log(data)

    } catch (err) {
      dispatch({ type: 'FETCH_REQUEST' });

      toast.error("Not a valid state");
      console.log(getError(err))
    }

    // console.log(data);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        console.log(data);
        console.log("data of order: " + JSON.stringify(data));
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || successPay || successDeliver ||(order._id && order._id !== orderId)) 
    {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {totalPrice,orderItems,isPaid}=order


  // const initialOptions = {
  //   "client-id":
  //     "AUq6Lg5pFbvivP6eTseEb9-d4qBJD-dMiuBzU40b9f-p2EVuxFQnp_vLmrmdnFbAvp_BONyOgrDt8rKH",
  //   currency: "USD",
  // };
  function createOrder(data, actions) {
    return actions.order.create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

 
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successfully.Please check your email !');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }
  const modifyhandler=()=>{

    console.log("hiii")
    dispatch({ type: 'MODIFY_NOT'})
  }
  console.log(emailx,firstname,lastname)
  useEffect(()=>{

    const OrderisPaid=async () =>{
      if(isPaid){
        await axios.post("/api/sendEmail",{
          firstname,
          lastname,
          email:emailx,
        })

    }
  }
  OrderisPaid();
       Cookies.set('Cart',[]);
      Cookies.set('total',0)

  },[isPaid])


  if (!Cartctx) {
    return null;
  }


  return (
    <>
      {(!errors.firstname &&
        !errors.lastname &&
        !errors.email &&
        !errors.repeatemail &&
        !errors.checkboxName) || (   
          <div className={css.error}>
          {errors.firstname && <span>*Name fileld required</span>}
          {errors.lastname && <span>*Name fileld required</span>}
          {errors.email && <span>*{errors.email?.message}</span>}
          {errors.repeatemail && <span>*{errors.repeatemail?.message}</span>}
          {!isChecked && <span>*You must agree the terms to proceed into the payment!</span>}

        </div>
      )}
      <ToastContainer
        style={{ fontSize: "1.3rem" }}
        position="bottom-center"
        limit={1}
      />

      <div className={css.pay} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.pay__info}>
          <div className={css.flexspace}>
          <h1 className={css.h1}>Billing Details</h1>
          {modify && 
          <Fade direction="right" triggerOnce={true}>
          <button onClick={modifyhandler} className={css.modify}>
            <span className={css.modify_text}>Modify</span>
          </button>

          </Fade>
          }
          </div>
          <div className={css.pay__info_input}>
            {datana.map((lab) => (
              <div className={`${css.pay__info_input_label} `} key={lab.id}>
                <label
                  htmlFor={lab.for}
                  className={`${css.label} ${
                    errors.firstname || errors.lastname
                      ? css.invalid__label
                      : ""
                  } `}
                >
                  <span
                    className={`${css.span} ${
                      errors.firstname || errors.lastname
                        ? css.invalid__label
                        : ""
                    } `}
                  >
                    {lab.label}
                  </span>
                  <span className={css.xo}>*</span>
                </label>
                <input
                  {...register(lab.fo, { required: true })}
                  id={lab.for}
                  name={lab.for}
                  type="text"
                  className={`${css.input} ${
                    errors.firstname || errors.lastname
                      ? css.invalid__input
                      : ""
                  } `}
                  autoComplete={lab.give}
                ></input>
              </div>
            ))}
            {email.map((ema) => (
              <div className={css.pay__info_input_email} key={ema.id}>
                <label htmlFor={ema.for} className={css.label}>
                  <span
                    className={`${css.span} ${
                      errors.email || errors.repeatemail
                        ? css.invalid__label
                        : ""
                    } `}
                  >
                    {ema.label}
                  </span>
                  <span className={css.xo}>*</span>
                </label>
                <input
                  {...register(ema.form, {
                    required: ema.message,
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  id={ema.for}
                  name={ema.for}
                  type="text"
                  className={`${css.input} ${
                    errors.email || errors.repeatemail ? css.invalid__input : ""
                  } `}
                  autoComplete={ema.give}
                ></input>
                <div className={css.warning}>
                  Your digital product will be sent to this email address,
                  please make sure you have access to it
                </div>
              </div>
            ))}
            {optional.map((opt) => (
              <div className={css.pay__info_input_email} key={opt.id}>
                <label htmlFor={opt.for} className={css.label}>
                  <span className={css.span}>{opt.label}</span>
                </label>
                <input
                  id={opt.for}
                  name={opt.for}
                  type="text"
                  placeholder={opt.holder}
                  className={css.input}
                  autoComplete={opt.give}
                ></input>
              </div>
            ))}
            <h1 className={css.h1}>Additional information</h1>
            <div className={css.pay__info_input_email}>
              <label htmlFor="note" className={css.label}>
                <span className={css.span}>Order notes (optionnal)</span>
              </label>
              <textarea
                id="note"
                name="note"
                type="text"
                placeholder="Notes about your order, e.g. special notes for delivery."
                className={css.input}
                autoComplete="off"
              ></textarea>
            </div>
          </div>
        </div>
        {/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ payement $$$$$$$$$$$$$$$$$$$$*/}
        <form className={css.pay__payement}>
          <h1 className={css.h1}>Your order</h1>
          <div className={css.pay__payement_title}>
            <h3 className={css.h3_1}>Product</h3>
            <h3 className={css.h3_2}>Subtotal</h3>
          </div>
          <hr className={css.hr} />
          {Cartctx.items.map((item, index) => (
            <>
              <div key={index} className={css.pay__payement_details}>
                <div className={css.pay_flex}>
                  <Image src={item.img} width={80} height={75}></Image>
                </div>
                <div className={css.pay__payement_details_titre}>
                  <h4 className={css.h4}>
                    {item.slug} x {item.amount}
                  </h4>
                </div>
                <div className={css.letotal}>${item.price}</div>
              </div>
              <hr className={css.hr} />
            </>
          ))}
          <div className={css.pay__payement_details}>
            <h3 className={css.h3_1}>Total</h3>
            <h3 className={css.h3_2_2}>${Cartctx.items.reduce((a, c) => a + c.amount * c.price, 0).toFixed(2)}</h3>
          </div>
          <div className={css.terms}>
            <input
              {...register("checkboxName",{ required: true })}
              name="checkboxName"
              id="checkboxName"
              type="checkbox"
              onChange={handleCheckboxChange}    
              className={css.terms_check}
            />
            <label htmlFor="checkboxName" className={css.terms_text}>
              I agree the terms & refund policy{" "}
              <span className={css.xo}>*</span>
            </label>
          </div>
          {/* <ButtonPay></ButtonPay> */}
          <button type="submit" className={`${css.button} ${modify ? css.none : '' } `} value="submit">
            {loadingx ? <>
              continue to payement
              <Image src={pay} className={css.button__image}></Image>     
            </>  : <Loader></Loader> }
          </button>
          {modify && (
            isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <Fade direction="right" triggerOnce={true}>
                      <div style={{ maxWidth: "750px", minHeight: "200px" }}>               
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                      </Fade>
                    ))
                    }
 
        </form>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Pay), { ssr: false });
