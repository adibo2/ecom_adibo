import React, { useState } from "react";
import Link from "next/link";
import css from "../../components/admin_style/dashboard.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import axios from "axios";
const Dashboard = () => {
  const [summary, Setsummary] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/admin/summary`);
        Setsummary(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // console.log(summary);
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <hr></hr>

      <div className={css.dashboard}>
       <NavbarAdmin></NavbarAdmin>
        <div className={css.dashboard__summary}>
          <h1 className={css.dashboard__summary_h1}>Admin dashboard</h1>
          <div className={css["dashboard__summary-cardsummary"]}>
            {/* Sales */}
            <div className={css["dashboard__summary-cardsummary-card"]}>
              <p className={css.p}>${summary.orderPrice} </p>
              <p className={css.p1}>Sales</p>
              <Link className={css.link} href="/admin/orders">
                View sales
              </Link>
            </div>
            {/* Orders */}
            <div className={css["dashboard__summary-cardsummary-card"]}>
              <p className={css.p}>{summary.orderCount} </p>
              <p className={css.p1}>Orders</p>
              <Link className={css.link} href="/admin/orders">
                View orders
              </Link>
            </div>
            {/* ProductWindows */}
            <div className={css["dashboard__summary-cardsummary-card"]}>
              <p className={css.p}>{summary.Productwindows} </p>
              <p className={css.p1}>ProductWindows</p>
              <Link className={css.link} href="/admin/productWindows">
                View productsWin
              </Link>
            </div>
            {/* ProductOffice */}
            <div className={css["dashboard__summary-cardsummary-card"]}>
              <p className={css.p}>{summary.ProductOffice} </p>
              <p className={css.p1}>ProductOffice</p>
              <Link className={css.link} href="/admin/productOffice">
                View productsOffice
              </Link>
            </div>
            {/* Users */}
            <div className={css["dashboard__summary-cardsummary-card"]}>
              <p className={css.p}>{summary.userCount} </p>
              <p className={css.p1}>Users</p>
              <Link className={css.link} href="/admin/users">
                View users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.auth = { adminOnly: true };
export default Dashboard;
