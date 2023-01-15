import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import css from "../../components/admin_style/dashboard.module.scss";
import css1 from "../../components/admin_style/order.module.scss"
import Link from 'next/link';

const ProductWindows = () => {
    const [windows,setwindows]=useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const {data} = await axios.get('/api/admin/productWindows');
                setwindows(data)

            } catch (err){

            }

        }
        fetchData();

    },[])
  return (
    <>
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
                        {order.name}
                      </td>
                      <td className={css1.table_td}>
                        {order.price}$
                      </td>
                      <td className={css1.table_td}>
                        {order.stock}
                      </td>
                      <td className={css1.table_td}>
                        {order.reviews.length}
                      </td>
                      <td className={css1.table_td}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className={`${css1.table_td} ${css1.table_buttonflex}`}>
                        <Link href={`/admin/productwindows/${order._id}`}>
                          <button type="button" className={css1.table_button}>
                            Edit
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          onClick={() => deleteHandler(order._id)}
                          className={css1.table_buttondelete}
                          type="button"
                        >
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
    
    </>
  )
}
ProductWindows.auth = { adminOnly: true };

export default ProductWindows