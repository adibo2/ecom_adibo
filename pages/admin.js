import Link from 'next/link';
import React, { useEffect } from 'react';
// import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import css from "./../styles/admin.module.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';



const Admin = () => {
    const router = useRouter();
    const { redirect } = router.query;

    const { data: session } = useSession();
    console.log("session "+session);

    useEffect(() => {
        if (session?.user) {      
            router.push(redirect || '/');

        }
      }, [router, session, redirect]);
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();
    const submitHandler = async ({ name, password }) => {
        console.log("name: " + name + "password: " + password);
        try {
          const result = await signIn('credentials', {
            redirect: false,
            name,
            password,
          });
          if (result.error) {
            toast.error("no login");
          }
        } catch (err) {
          toast.error("no loz,s;d,sdnin");
        }
      };
  return (
    <div>
        <ToastContainer style={{ fontSize: "1.3rem" }}  position="bottom-center"  limit={1} />

    <form
        className={css.form}
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="name">MPPMP</label>
          <input
           {...register('name', {
            required: 'name',
            
          })}
            type="text"

            className={css.input}
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className={css.input}
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className={css.button}>Login</button>
        </div>
        {/* <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div> */}
      </form>
    </div>
  )
}

export default Admin