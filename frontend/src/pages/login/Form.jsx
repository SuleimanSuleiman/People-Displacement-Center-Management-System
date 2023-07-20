import React, { useEffect, useState } from 'react'
import bgImg from './img5.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { Link, Navigate } from 'react-router-dom';



export default function Form({setIsManger,setisLoggedIn,set_email,set_first_name,setCenterId,set_last_name,set_verify_email}) {

  const [res, setResponse] = useState(null);
  const [err, setError] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const HandleSuccess = (data) => {
    setisLoggedIn(true)
    set_email(data.email)
    set_first_name(data.first_name)
    set_last_name(data.last_name)
    set_verify_email(data.confirmEmail)
    setCenterId(data.centerId)
    if (data.email === 'johnmikegithub@gmail.com') {
      setIsManger(true)
    }
    Navigate('/')
  }

  const onSubmit = async (data) => {

        await axios('http://localhost:3000/humen/login', {
          method: 'POST',
          data: JSON.stringify(data),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => HandleSuccess(data.data))
          .catch(err => setError(err.response));
  };

  return (
    <section className='soso'>
      <div className="register">
        <div className="col-1">
        {
          res == 201  ?
            (
              <div style={{ color: 'green' }}>
                      <p><span>Status : 201</span></p>
                      <p>Message : <span>Please verify your Email</span></p>
              </div>
            )
              :
          <>
             <div>
                {
                err && (
                    <div style={{ color: 'red' }}>
                      <p><span>{err['status']?`Status: ${err['status']}`: `Success: False | 500`}</span></p>
                      <p>Message : <span>{ err['message'] || 'Invalid Input'}</span></p>
                  </div>
                )
              }
                <h2>Login</h2>
                <span>Login and do your job</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("email")} placeholder='email' />
                    <input type="text" {...register("password")} placeholder='password' />
                    <button className='btn'>Login</button>
                  </form>
                  <p>
                    <Link to='/register' style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >
                       Create new Account
                    </Link>
                  </p>
            </div>
          </>
          }
          </div>
        <div className="col-2">
            <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  )
}