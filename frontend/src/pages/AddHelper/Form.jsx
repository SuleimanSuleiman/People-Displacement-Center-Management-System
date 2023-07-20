import React, { useEffect, useState } from 'react'
import bgImg from './img4.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { color } from 'echarts';


export default function Form({centerId}) {

  const [res, setResponse] = useState(null);
  const [err, setError] = useState(null);
  const [PrintSucc,setPrintSucc]= useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const onSubmit = async (data) => {

    console.log(data);
        await axios('http://localhost:3000/humen/addHelper', {
          method: 'POST',
          withCredentials: true,
          data: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            setResponse(data.data)
            setPrintSucc(true)
          })
          .catch(err => setError(err.response.data));
  };

  return (
    <section className='soso'>
      <div className="">
        {
          PrintSucc &&  (
            <div>
              <p>Successfully</p>
            </div>
          )
        }
        <div className="col-1">
                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("first_name")} placeholder='first_name' />
                    <input type="text" {...register("last_name")} placeholder='last_name' />
                    <input type="text" {...register("email")} placeholder='email' />
                    <input type="text" {...register("active")} placeholder='Active' />
                    <input type="text" hidden value={centerId} {...register("centerId", { required: true})} placeholder='ID' />
                    <button className='btn'>Add Helper</button>
                </form>
            </div>
          </div>
    </section>
  )
}
