import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import css from "../../components/admin_style/dashboard.module.scss";
import css1 from "../../components/admin_style/order.module.scss"


const Users = () => {
    const [windows,setwindows]=useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const {data} = await axios.get('/api/admin/user');
                setwindows(data)

            } catch (err){

            }

        }
        fetchData();
        console.log(windows)

    },[])
  return (
    <>
        <Navbar></Navbar>
        <hr></hr>
    <div className={css.dashboard}>
        <NavbarAdmin></NavbarAdmin>
        <div className={css1.content}>
            <h1 className={css.dashboard__summary_h1}>Admin Users</h1>
            <div className={css1.table}>
              <table className={css1.tableorder}>
                <thead className={css1.table_thread}>
                  <tr>
                    <th className={css1.table_title}>ID</th>
                    <th className={css1.table_title}>firstName</th>
                    <th className={css1.table_title}>lastName</th>
                    <th className={css1.table_title}>email</th>
                    <th className={css1.table_title}>Admin</th>
                    <th className={css1.table_title}>Date</th>
                    <th className={css1.table_title}>ACTIONS</th>


       
                  </tr>
                </thead>
                <tbody>
                  {windows.map((order) => (
                    <tr key={order._id} className={css1.tr}>
                      <td className={css1.table_td}>{order._id.substring(20, 24)}</td>
                      <td className={css1.table_td}>
                        {order.firstname}
                      </td>
                      <td className={css1.table_td}>
                        {order.lastname}
                      </td>
                      <td className={css1.table_td}>
                        {order.email}
                      </td>
                      <td className={css1.table_td}>
                        {order.isAdmin ? 'Admin' : 'User'}
                      </td>

                      <td className={css1.table_td}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className={`${css1.table_td} ${css1.table_buttonflex}`}>
                        {/* <Link href={`/admin/product/${product._id}`}> */}
                          <a type="button" className={css1.table_button}>
                            Edit
                          </a>
                        {/* </Link> */}
                        &nbsp;
                        <button
                          onClick={() => deleteHandler(product._id)}
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
Users.auth = { adminOnly: true };

export default Users