import React from 'react'
import { Link } from 'react-router-dom'
import Form from './Form.jsx'

export default function Login({setIsManger,setCenterId,setisLoggedIn,set_email,set_first_name,set_last_name,set_verify_email}) {
  return (
    <div>
      <Form
        set_email={set_email}
       set_first_name={set_first_name}
       set_last_name={set_last_name}
       set_verify_email ={set_verify_email}
        setisLoggedIn={setisLoggedIn}
        setCenterId={setCenterId}
        setIsManger={setIsManger}
      ></Form>
    </div>
  )
}
