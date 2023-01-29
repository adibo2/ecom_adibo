import { useState,useEffect } from "react";
import css from "./Tab.module.scss";
import Image from "next/image";
import { x2, x3 } from "./content";
import user from "/public/img/user.png";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import css1 from "./../../payement/Pay.module.scss";
import { useRouter } from "next/router";


// import "./Tab.css";

const x1 = [
  {
    title: "Buy a genuine Windows 10 Pro key from our website",
  },
  {
    title:
      "Immediately after your payment, the license will be sent to the email address you provided",
  },
  {
    title: (
      <>
        Download the Windows 10 installer from Microsoft official website{" "}
        <a
          className={css.ab}
          href="https://www.microsoft.com/en-us/software-download/windows10"
        >
          Here
        </a>
      </>
    ),
  },
  {
    title:
      "Follow the instructions on the Microsoft website to download and install Windows 10 Professional",
  },
  {
    title:
      " Once installed, enter the unique activation key that you purchased from us",
  },
  {
    title:
      "The key will be authenticated with Microsoft automatically and Windows 10 Professional activation will be completed",
  },
];

const data = [
  {
    titre: "Description",
  },
  {
    titre: "License Details",
  },
  {
    titre: "System requirements",
  },
  {
    titre: "Download",
  },

  // {
  //   titre: "Reviews",
  // },
];
const reviews = [
  {
    id: "a1",
    label: "First Name",
    for: "firstname",
    give: "given-name",
    form: "firstname",
  },

  {
    id: "e2",
    label: "email",
    for: "email",
    give: "off",
    form: "email",
  },
];
function Tabo(props) {
  const [toggleState, setToggleState] = useState(0);
  const router=useRouter();
  const [value, setvalue] = useState(5);


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(()=>{
    if(props.scrolldown){

      setToggleState(4)
    }
    

  },[props.scrolldown,props.scollhandler])

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const onSubmit = async (data) => {
    // console.log("data reviews"+data)
    props.onsubmit(data)
    reset();
  };
  


  return (
    <div className="container">
      <div className="bloc-tabs">
        {data.map((item, index) => (
          <>
            {/* {console.log("indexdialtab" + index)} */}
            <button
              key={index}
              className={toggleState === index ? "tabs active-tabs" : "tabs"}
              onClick={() => {toggleTab(index);}}
            >
              {item.titre}
            </button>
          </>
        ))}
            <button
              key={4}
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => {toggleTab(4); props.onReview()}}
            >
              Reviews ({props.reviewtaille > 0 ? (props.reviewtaille) : (0) })
              {/* ({props.reviewtaille}) */}
            </button>

      </div>

      <div id="reviews" className="content-tabs">
        {props.data.map((data, index) => {
          // console.log("index" + index);
          // console.log("toggleState " + toggleState);

          if (toggleState === 0) {
            return (
              <div
                key={index}
                className={
                  toggleState === index ? "content  active-content" : "content"
                }
              >
                <div className={css.tab}>
                  <Image
                    src={data.img}
                    layout="fill"
                    style={{ fontWeight: "bold" }}
                    alt={props.alt}

                    // objectFit="contain"
                  ></Image>
                </div>
                <h2 className={css.h2}>{data.title}</h2>
                <h3 className={css.h3}>{data.sous}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous1}</h4>
                <ol className={css.ol}>                   
                   { x1.map((x, index) => (
                      <li key={index} className={css.li}>
                        {x.title}
                      </li>
                    ))}

                </ol>
                <h4 className={css.h4}>{data.sous2}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu2 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous3}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu3 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous4}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu4 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous5}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu5 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous6}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu6 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous7}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu7 }}
                  className={css.p}
                ></p>
                <h4 className={css.h4}>{data.sous8}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: data.contenu8 }}
                  className={css.p}
                ></p>
              </div>
            );
          } else if (toggleState === 1) {
            return (
              <div
                key={index}
                className={
                  toggleState === index ? "content  active-content" : "content"
                }
              >
                <div className={css.details}>
                  <div className={css.details_title}>License details</div>
                  {x2.map((x, index) => (
                    <div key={index}>{x.name}</div>
                  ))}
                </div>
              </div>
            );
          } else if (toggleState === 2) {
            return (
              <div
                key={index}
                className={
                  toggleState === index ? "content  active-content" : "content"
                }
              >
                <div className={css.details}>
                  <div className={css.details_title}>{data.title}</div>
                  {x3.map((x, index) => (
                    <div key={index}>{x.name}</div>
                  ))}
                </div>
              </div>
            );
          } else if (toggleState === 3) {
            return (
              <div
                key={index}
                className={
                  toggleState === index ? "content  active-content" : "content"
                }
              >
                <div className={css.details_dow}>
                  <div className={css.details_title}>{data.title}</div>
                  <div className={css.sous}>{data.sous}</div>
                  <a
                    href="https://www.microsoft.com/en-us/software-download/windows10"
                    className={css.link}
                  >
                    {data.link}
                  </a>
                </div>
              </div>
            );
          } else if (toggleState === 4 ) {
            return (
              <div
                id="reviews"
                key={index}
                className={
                  toggleState === index ? "content  active-content" : "content"
                }
              >
                <div className={css.reviews}>
                  {/****************************** CLIENT  $$$$$$$$$$$$$$$$$$$$$$$$*/}
                  <div className={css.reviews_client}>
                    <div className={css.reviews_client_title}>
                      {props.reviewtaille} <span>reviews</span> {router.query.winId}
                    </div>
                    {props.reviews.map((review,index)=>(
                    <div className={css.reviews_client_revue} key={index}>
                      <Image
                        src={user}
                        width={45}
                        height={45}
                        alt="use Buying windows Keys"
                      ></Image>
                      <div className={css.bloc}>
                        <div className={css.bloc_title}>
                          <div>
                          <span className={css.bloc_title_left_bold}>
                            {review.firstname}
                          </span>
                          <span className={css.bloc_title_left}>
                          -{review.createdAt?.slice(0, 10)}
                          {/* {Date.now()} */}

                          </span>

                          </div>
                          <span className={css.bloc_title_right}>
                          <Stack spacing={1}>
                                <Rating
                                  className={css.stars}
                                  name="rating"
                                  value={review.rating}
                                  size="large"
                                  readOnly
                                />
                              </Stack>{" "}
                          </span>
                        </div>
                        <div className={css.bloc_content}>
                         {review.note}
                        </div>
                      </div>
                    </div>

                    ))}
                  </div>
                  {/* $$$$$$$$$$$FORM  ******************/}

                  <form
                    className={css.reviews_form}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h1 className={css.hreview}>Add a review </h1>
                    <div className={css.add}>
                      Your rating <span className={css1.xo}>*</span>
                    </div>
                    <Controller
          name="rating"
          control={control}
          defaultValue={value}
          
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Rating
            // value={rat}
            
            size="10rem"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
             
            />
          )}
        
        />
                    {reviews.map((ema) => (
                      <div className={css1.pay__info_input_email} key={ema.id}>
                        <label htmlFor={ema.for} className={css1.label}>
                          <span 
                           className={`${css1.span} ${
                            errors.firstname || errors.email || errors.subject
                              ? css1.invalid__label
                              : ""
                          } `}
                          >
                            {ema.label}
                            </span>
                          <span className={css1.xo}>*</span>
                        </label>
                        <input
                          {...register(ema.form, {
                            required: "Email Address is required",
                          })}
                          id={ema.for}
                          name={ema.for}
                          type="text"
                          className={`${css1.input} ${
                            errors.note
                              ? css1.invalid__input
                              : ""
                          } `}
                          autoComplete={ema.give}
                        ></input>
                      </div>
                    ))}
                    <div className={css1.pay__info_input_email}>
                      <label htmlFor="note" className={css1.label}>
                        <span
                         className={`${css1.span} ${
                          errors.firstname || errors.email || errors.subject
                            ? css1.invalid__label
                            : ""
                        } `}
                         >Your review</span>
                      </label>
                      <textarea
                      rows="10" cols="50"
                        {...register("note", {
                          required: "Email Address is required",
                        })}
                        id="note"
                        name="note"
                        type="text"
                        placeholder="Add your review."
                        className={`${css1.input} ${
                          errors.note
                            ? css1.invalid__input
                            : ""
                        } `}
                        autoComplete="off"
                      ></textarea>
                    </div>
                    <div>
                      {/* <div className={css.error}> */}
                      {/* {errors.firstname && <span>*Name fileld required</span>} */}
                      {/* {errors.lastname &&(<span>*Name fileld required</span>)}
      {errors.email &&(<span>*{errors.email?.message}</span>)}
      {errors.repeatemail &&<span>*{errors.repeatemail?.message}</span>} */}

                      {/* </div> */}
                    </div>
                    <button
                      type="submit"
                      className={css1.button}
                      value="submit" 
                      onClick={props.onClick}
                    >
                      Submit Your Review
                    </button>
                  </form>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default Tabo;



{
  /* <div
    className={toggleState === 2 ? "content  active-content" : "content"}
  >
    <h2>Content 2</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
      voluptatum qui adipisci.
    </p>
  </div>

  <div
    className={toggleState === 3 ? "content  active-content" : "content"}
  >
    <h2>Content 3</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
      nostrum rerum laudantium totam unde adipisci incidunt modi alias!
      Accusamus in quia odit aspernatur provident et ad vel distinctio
      recusandae totam quidem repudiandae omnis veritatis nostrum
      laboriosam architecto optio rem, dignissimos voluptatum beatae
      aperiam voluptatem atque. Beatae rerum dolores sunt.
    </p>
  </div> */
}
