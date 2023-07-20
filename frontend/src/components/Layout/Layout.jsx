import moment from "moment/moment";
import css from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Layout = ({ isManger,email, verify_email,first_name,last_name,centerId,centerData, setCenterData}) => {

  const { pathname } = useLocation();


  const getCenterData = () => {
      return  axios(`http://localhost:3000/center/${centerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => setCenterData(data.data))
          .catch(err => setError(err.response.data));
  }

  useEffect(() => {
    getCenterData()
  }, [])
  

  return (
    <div className={css.container}>
      <Sidebar isManger={isManger} />


      {/* making the dashboard as the default route */}
      {pathname === "/" && !isManger && <Navigate to="/Refugee" />}
      {pathname === "/" && isManger && <Navigate to="/manger" />}


      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>

          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          {
            centerData && (
              <div style={{
                width: '250px',
                display: 'flex',
                justifyContent: 'space-around',
                background: 'black',
                border: 'none',
                borderRadius: '20px',
                fontSize: '22px',
              }}>
                <p>{centerData.city}</p>
                <p>|</p>
                <p>{ centerData.location}</p>
              </div>
            )
          }

          <div className={css.profile}>
            {
              verify_email
                ?
                (
                  <div className={css.details}>
                    <span>{first_name} {last_name}</span>
                  <span>{email}</span>
                </div>
                )
                :
                (
                <div className={css.details}>
                  <span style={{color:'red'}}>Please Verify Your Email</span>
                </div>
                )
            }
          </div>


        </div>


        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
