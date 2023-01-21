import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import css from "../../components/admin_style/dashboard.module.scss";
import css1 from "../../components/admin_style/order.module.scss";

const Orders = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/admin/order");
        setorders(data);
      } catch (err) {}
    };
    fetchData();
    console.log(orders);
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <hr></hr>
      <div className={css.dashboard}>
        <NavbarAdmin></NavbarAdmin>
        <div className={css1.content}>
          <h1 className={css.dashboard__summary_h1}>Admin Orders</h1>
          <div className={css1.table}>
            <table className={css1.tableorder}>
              <thead className={css1.table_thread}>
                <tr>
                  <th className={css1.table_title}>ID</th>
                  <th className={css1.table_title}>USER_firstname</th>
                  <th className={css1.table_title}>USER_lastname</th>
                  <th className={css1.table_title}>USER_email</th>
                  <th className={css1.table_title}>DATE</th>
                  <th className={css1.table_title}>TOTAL</th>
                  <th className={css1.table_title}>Items</th>

                  <th className={css1.table_title}>PAID</th>
                  <th className={css1.table_title}>DELIVERED</th>
                  <th className={css1.table_title}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className={css1.tr}>
                    <td className={css1.table_td}>
                      {order._id.substring(20, 24)}
                    </td>
                    <td className={css1.table_td}>
                      {order.user ? order.user.firstname : "DELETED USER"}
                    </td>
                    <td className={css1.table_td}>
                      {order.user ? order.user.lastname : "DELETED USER"}
                    </td>
                    <td className={css1.table_td}>
                      {order.user ? order.user.email : "DELETED USER"}
                    </td>
                    <td className={css1.table_td}>
                      {order.createdAt.substring(0, 10)}
                    </td>

                    <td className={css1.table_td}>${order.totalPrice}</td>
                    <td className={css1.table_td}>
                      {order.orderItems.map((el) => (
                        <>
                        <h1 className={css1.order_name}>{el.name}-</h1>
                        <p>{el.amount}</p>
                        </>
                      ))}.
                    </td>

                    <td className={css1.table_td}>
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : "not paid"}
                    </td>
                    <td className={css1.table_td}>
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "not delivered"}
                    </td>
                    <td className={css1.table_td}>
                      {/* <Link href={`/order/${order._id}`} passHref>
                          <a>Details</a>
                        </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
Orders.auth = { adminOnly: true };

export default Orders;
