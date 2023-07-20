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
        await axios(`http://localhost:3000/carage/addTruck/${centerId}`, {
          method: 'POST',
          withCredentials: true,
          data: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            setError(null);
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
        {
          err && (
            <div>
              <p>{ err.message}</p>
            </div>
          )
        }
        <div className="col-1">
                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("carId")} placeholder='CAR ID ' />
                    <input type="text" {...register("typeCar")} placeholder='type Car' />
                    <input type="text" {...register("desc")} placeholder='desc' />
                    <input type="text" {...register("active")} placeholder='Active' />
                    <button className='btn'>Add Truck</button>
                </form>
            </div>
          </div>
    </section>
  )
}
