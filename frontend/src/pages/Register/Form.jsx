import React, { useEffect, useState } from 'react'
import bgImg from './img4.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { color } from 'echarts';


export default function Form({setisLoggedIn}) {

  const [res, setResponse] = useState(null);
  const [err, setError] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const onSubmit = async (data) => {

        await axios('http://localhost:3000/humen/signup', {
          method: 'POST',
          data: JSON.stringify(data),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => { setResponse(data.status); setisLoggedIn(true) })
          .catch(err => setError(err.response.data));
  };

  return (
    <section className=''>
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
                <h2>Sign In</h2>
                <span>register and do your job</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("first_name")} placeholder='first_name' />
                    <input type="text" {...register("last_name")} placeholder='last_name' />
                    <input type="text" {...register("email")} placeholder='email' />
                    <input type="text" {...register("role")} placeholder='role' />
                    <input type="text" {...register("password")} placeholder='password' />
                    <input type="text" {...register("passwordConfirmation")} placeholder='confirm password' />
                    <input type="number" {...register("age", { required: true,valueAsNumber: true })} placeholder='Age' />
                    <input type="text" {...register("centerId", { required: true})} placeholder='ID' />
                    {errors.age?.type === "required" && "Age Number is required"}
                    {errors.age?.type === "maxLength" && "Max Length Exceed"}
                    <button className='btn'>Sign In</button>
                </form>
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
