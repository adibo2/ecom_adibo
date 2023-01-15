import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import { getError } from '../../../utils/error';
import css from "../../../components/admin_style/dashboard.module.scss";
import css1 from "../../../components/admin_style/order.module.scss"
import Navbar from '../../../components/Navbar/Navbar';
import NavbarAdmin from '../../../components/admin/NavbarAdmin';
import "react-toastify/dist/ReactToastify.css";

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
  
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true, errorUpdate: '' };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false, errorUpdate: '' };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false, errorUpdate: action.payload };
  
      case 'UPLOAD_REQUEST':
        return { ...state, loadingUpload: true, errorUpload: '' };
      case 'UPLOAD_SUCCESS':
        return {
          ...state,
          loadingUpload: false,
          errorUpload: '',
        };
      case 'UPLOAD_FAIL':
        return { ...state, loadingUpload: false, errorUpload: action.payload };
  
      default:
        return state;
    }
  }


const AdminproducteditWindows = () => {
    const {query}=useRouter();
    console.log(query)
    const productId=query.id;
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

      useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const {data}=await axios.get(`/api/admin/productwindows/${productId}`)
                setValue('name', data.name)
                setValue('slug', data.slug)
                setValue('price', data.price)
                setValue('notprice', data.notprice)
                setValue('Stock', data.stock)
                setValue('description', data.desc)
                setValue('alt',data.alt);
                setValue('meta',data.meta);
                setValue('title', data.title)
                setValue('image', data.img)

            } catch(e){
                console.log(e)
            }

        }
        fetchdata();

      },[productId,setValue])

      const submitHandler=async({name,slug,price,notprice,image,Stock,meta,description,alt,title})=>{
        try{
          console.log("name",name)
          dispatch({ type: 'UPDATE_REQUEST' });

          await axios.put(`/api/admin/productwindows/${productId}`,{
            name,
            slug,
            price,
            notprice,
            image,
            Stock,
            meta,
            description,
            alt,
            title
          })
          dispatch({ type: 'UPDATE_SUCCESS' });
          toast.success('Product updated successfully');


        }catch(e){
          toast.error(getError(e));

          

        }


      }
  return (
    <div>
       <ToastContainer
        style={{ fontSize: "1.3rem" }}
        position="bottom-center"
        limit={1}
      />

          <Navbar></Navbar>
        <hr></hr>
    <div className={css.dashboard}>
        <NavbarAdmin></NavbarAdmin>
        <div className={css1.content}>        
        <form className={css1.form} onSubmit={handleSubmit(submitHandler)}>
            <h1 className={css.dashboard__summary_h1}>{`Edit Product ${productId}`}</h1>
            <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="name">Name</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
            </div>
            <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="slug"
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="price">Price</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="price"
                  {...register('price', {
                    required: 'Please enter notprice',
                  })}
                />
                {errors.notprice && (
                  <div className="text-red-500">{errors.notprice.message}</div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="notprice">notprice(price that will be dashed)</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="notprice"
                  {...register('notprice', {
                    required: 'Please enter notprice',
                  })}
                />
                {errors.notprice && (
                  <div className="text-red-500">{errors.notprice.message}</div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="image">image</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="image"
                  {...register('image', {
                    required: 'Please enter image',
                  })}
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image.message}</div>
                )}
              </div>
              {/* <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className={css1.form__input}
                  id="imageFile"
                //   onChange={uploadHandler}
                />

                {loadingUpload && <div>Uploading....</div>}
              </div> */}
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="Stock">Stock</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="Stock"
                  {...register('Stock', {
                    required: 'Please enter Stock',
                  })}
                />
                {errors.Stock && (
                  <div className="text-red-500">{errors.Stock.message}</div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="countInStock">description</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="alt">alt of image</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="alt"
                  {...register('alt', {
                    required: 'Please enter alt',
                  })}
                />
                {errors.alt && (
                  <div className="text-red-500">{errors.alt.message}</div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="meta">meta description(for Seo)</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="meta"
                  {...register('meta', {
                    required: 'Please enter meta name description',
                  })}
                />
                {errors.alt && (
                  <div className="text-red-500">{errors.meta.message}</div>
                )}
              </div>
              <div className={css1.form__survey}>
                <label className={css1.form__label} htmlFor="title">title</label>
                <input
                  type="text"
                  className={css1.form__input}
                  id="title"
                  {...register('title', {
                    required: 'Please enter title',
                  })}
                />
                {errors.title && (
                  <div className="text-red-500">{errors.title.message}</div>
                )}
              </div>
              <div className={css1.form__buttons}>
                <button className={css1.form__update} disabled={loadingUpdate}>
                  <b className={css1.form__update_text}>{loadingUpdate ? 'Loading' : 'Update !'}</b>
                 
                </button>
              <div className={css1.form__back}>
                <Link href={`/admin/productWindows`}>
                  <span className={css1.form__back_text}>Back</span>
                </Link>
              </div>

              </div>
   
        </form>
        </div>

    </div>
    

    </div>
  )
}

export default AdminproducteditWindows