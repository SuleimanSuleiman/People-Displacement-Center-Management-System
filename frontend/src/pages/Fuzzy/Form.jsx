import React, { useEffect, useState } from 'react'
import bgImg from './img4.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { color } from 'echarts';


export default function Form({centerId}) {

  const [res, setResponse] = useState(null);
  const [err, setError] = useState(null);
  const [loading,setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data);
        await axios('http://localhost:3000/manger/fuzzy', {
          method: 'POST',
          data: JSON.stringify(data),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            console.log(data.data)
            setResponse(data.data)
            setLoading(false)
          })
          .catch(err => { setError(err.response.data);setLoading(false) });
  };

  return (
    <section className='soso'>
      <div className="">
        {
          !loading && res ? (
            <div>
              <p>Status: { res.status}</p>
              <p>Result: { res.message[0]}</p>
              <p>Choose: { res.message[1]}</p>
            </div>
          ) : (
              <h1>Loading ...</h1>
          )
        }
        <div className="col-1">
                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("population_growth")} placeholder='population_growth' />
                    <input type="text" {...register("earthquake_average")} placeholder='earthquake_average' />
                    <input type="number" {...register("building_resistance")} placeholder='building_resistance' />
                    <input type="text" hidden value={centerId} {...register("centerId", { required: true})} placeholder='ID' />
                    <button className='btn'>Fuzzy</button>
                </form>
            </div>
          </div>
    </section>
  )
}
