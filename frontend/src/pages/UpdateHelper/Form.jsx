import React, { useEffect, useState } from 'react'
import bgImg from './img4.jpg';
import { useForm } from 'react-hook-form';
import axios from "axios";

import "./Form.css";
import { color } from 'echarts';


export default function Form({centerId,centerData}) {

  const [res1, setResponse1] = useState(null);
  const [err1, setError1] = useState(null);
  const [res2, setResponse2] = useState(null);
  const [err2, setError2] = useState(null);
  const [res3, setResponse3] = useState(null);
  const [err3, setError3] = useState(null);
  const [PrintSucc1,setPrintSucc1]= useState(false)
  const [PrintSucc2,setPrintSucc2]= useState(false)
  const [PrintSucc3,setPrintSucc3]= useState(false)

  const { register:one, handleSubmit:oneHandler, watch:watch1, formState: { errors:errors1 } } = useForm();
  const { register:tow, handleSubmit:TwoHandler, watch:watch2, formState: { errors:errors2 } } = useForm();
  const { register:three, handleSubmit:ThreeHandler, watch:watch3, formState: { errors:errors3 } } = useForm();


  console.log(err2)

  const onSubmit1 = async (data) => {
        await axios(`http://localhost:3000/humen/removehelper/${data.id}`, {
          method: 'Get',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            setResponse1(data.data)
            setPrintSucc1(true)
            console.log(data)
          })
          .catch(err => {
            setError1(err.response.data)
            setResponse1(null);
          }
          );
  };

    const onSubmit2 = async (data) => {
        await axios(`http://localhost:3000/humen/leavehelper/${data.id}`, {
          method: 'Get',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            setResponse2(data.data)
            setPrintSucc2(true)
            console.log(data)
          })
          .catch(err => {
            setError2(err.response.data)
            setResponse2(null);
          }
          );
  };
    const onSubmit3 = async (data) => {
        await axios(`http://localhost:3000/humen/needHelper/${data.num}/${centerData.location}/${centerId}`, {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            setResponse3(data.data)
            setPrintSucc3(true)
          })
          .catch(err => {
            setError3(err.response.data)
            setResponse3(null);
          }
          );
  };

  return (
    <section className='soso'>
      <div className="register">
        <div className="col-1">
        {
          PrintSucc1 &&  (
            <div>
              <p>Successfully</p>
            </div>
          )
        }
        {
            err1 && (
              <>
                <span>{err1.status}</span><br />
                <span>{err1.message}</span>
              </>
          )
        }
                <form id='form' className='flex flex-col' onSubmit={oneHandler(onSubmit1)}>
                    <input type="text" {...one("id")} placeholder='ID' />
                    <button className='btn'>Remove Helper</button>
                </form>
        </div>
        <div className="col-1">
                  {
          PrintSucc2 &&  (
            <div>
              <p>Successfully</p>
            </div>
          )
        }
        {
            err2 && (
              <>
                <span>{err2.status}</span><br />
                <span>{err2.message}</span>
              </>
          )
        }
            <form id='form' className='flex flex-col' onSubmit={TwoHandler(onSubmit2)}>
                    <input type="text" {...tow("id")} placeholder='ID' />
                    <button className='btn'>Leave Helper</button>
            </form>
        </div>
        <div className="col-1">
                  {
          res3 &&  (
              <div>
                {console.log(res3)}
              <p>num helper we sent hem message: {res3.number_of_helper}</p>
            </div>
          )
        }
        {
          err3 && (
            <span>Invalid Input</span>
          )
        }
            <form id='form' className='flex flex-col' onSubmit={ThreeHandler(onSubmit3)}>
                    <input type="text" {...three("num")} placeholder='Number Of Helper You Need' />
                    <button className='btn'>Fetch Helper</button>
            </form>
        </div>
          </div>
    </section>
  )
}
