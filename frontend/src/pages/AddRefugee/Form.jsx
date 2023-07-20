import React, { useEffect, useState } from 'react'
import bgImg from './img4.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { color } from 'echarts';


export default function Form({centerId}) {

  const [res, setResponse] = useState(null);
  const [err, setError] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const onSubmit = async (data) => {

        await axios('http://localhost:3000/humen/addrefugee', {
          method: 'POST',
          data: JSON.stringify(data),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => setResponse(data.data))
          .catch(err => setError(err.response.data));
  };


  return (
    <section className='soso'>
      <div className="">
        {
          res && (
            <div>
              <p style={{ color: '#ccc'}}>Successfully</p>
            </div>
          )
        }
        {
          err && (
            <div>
              <p>{ err.success}</p>
              <p style={{ color: 'red' }}>{err.message}</p>
            </div>
          )  
        }
        <div className="col-1">
                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("first_name")} placeholder='first_name' />
                    <input type="text" {...register("last_name")} placeholder='last_name' />
                    <input type="text" {...register("father_name")} placeholder='father_name' />
                    <input type="text" {...register("mother_name")} placeholder='mother_name' />
                    <input type="text" {...register("condtion")} placeholder='condtion' />
                    <input type="text" {...register("city")} placeholder='city' />
                    <input type="text" {...register("vellage")} placeholder='vellage password' />
                    <input type="text" hidden value={centerId} {...register("centerId", { required: true})} placeholder='ID' />
                    <button className='btn'>Add Refugee</button>
                </form>
            </div>
          </div>
    </section>
  )
}
