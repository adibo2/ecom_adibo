import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import css from "../../components/admin_style/dashboard.module.scss";
import css1 from "../../components/admin_style/order.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/router';


const ProductOffice = () => {
    const [office,setOffice] = useState([])
    const router=useRouter();


    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const {data} = await axios.get('/api/admin/productOffice');
                setOffice(data)

            } catch (err){

            }

        }
        fetchData();
        console.log(office)

    },[])
    const ReviewHandler=()=>{
      router.push('')
  
    }
  return (
    <>
        <Navbar></Navbar>
        <hr></hr>
    <div className={css.dashboard}>
        <NavbarAdmin></NavbarAdmin>
        <div className={css1.content}>
            <h1 className={css.dashboard__summary_h1}>Admin ProductOffice</h1>
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
                  {office.map((order) => (
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
                      <td className={`${css1.table_td} ${css1.tableflex}`}>
                        {order.reviews.length}
                        <Link href={`/admin/reviewsoffice/${order._id}`}>
                        <button onClick={ReviewHandler} className={css1.tablebutton}>
                          viewReviews
                        </button>
                        </Link>
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
ProductOffice.auth = { adminOnly: true };

export default ProductOffice;