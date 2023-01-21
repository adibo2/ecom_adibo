import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import { getError } from '../../../utils/error';
import css from "../../../components/admin_style/dashboard.module.scss";
import css1 from "../../../components/admin_style/order.module.scss"
import Navbar from '../../../components/Navbar/Navbar';
import NavbarAdmin from '../../../components/admin/NavbarAdmin';
import dynamic from 'next/dynamic';

import "react-toastify/dist/ReactToastify.css";
const AdminReviews = () => {

    const [windows,setwindows]=useState([])
    const {query}=useRouter();
    const productId=query.id;
    useEffect(()=>{
        const fetchData = async () =>{
            try{
              const {data}=await axios.get(`/api/admin/productwindows/${productId}/reviews/kkk`)                
                setwindows(data)

            } catch (err){

            }

        }
        fetchData();

    },[productId])
    const deleteHandler = async (reviewId) => {
        if (!window.confirm('Are you sure?')) {
          return;
        }
        try {
          await axios.delete(`/api/admin/productwindows/${productId}/reviews/${reviewId}`);
          toast.success('reviews deleted successfully');
        } catch (err) {
          toast.error(getError(err));
        }
      };
  return (
    <div>
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
            <h1 className={css.dashboard__summary_h1}>Admin ProductWindows</h1>
            <div className={css1.table}>
              <table className={css1.tableorder}>
                <thead className={css1.table_thread}>
                  <tr>
                    <th className={css1.table_title}>ID</th>
                    <th className={css1.table_title}>Name</th>
                    <th className={css1.table_title}>Price</th>
                    <th className={css1.table_title}>Stock</th>
                    <th className={css1.table_title}>Reviews</th>
                    <th className={css1.table_title}>Date</th>
                    <th className={css1.table_title}>ACTIONS</th>


       
                  </tr>
                </thead>
                <tbody>
                   
                  {windows.map((order) => (
                    <tr key={order._id} className={css1.tr}>
                      <td className={css1.table_td}>{order._id.substring(20, 24)}</td>
                      <td className={css1.table_td}>
                        {order.note}
                      </td>
                      <td className={css1.table_td}>
                        {order.rating}
                      </td>
                      <td className={css1.table_td}>
                        {order.firstname}
                      </td>
                      <td className={css1.table_td}>
                        {order.email}
                      </td>
                      <td className={css1.table_td}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className={`${css1.table_td} ${css1.tableflex}`}>
                        <button
                         onClick={() => deleteHandler(order._id)}
                         className={css1.tablebutton}>
                          Delete
                        </button>
                      </td>
   
  

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

    

    </div>
    </div>
    </div>
  )
}
export default dynamic(() => Promise.resolve(AdminReviews), { ssr: false });

