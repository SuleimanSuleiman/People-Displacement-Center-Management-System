import React from 'react'
import Form from './Form.jsx'

export default function AddHelper({centerId,centerData}) {
  return (
    <div>
      <Form centerId={centerId} centerData={centerData}></Form>
    </div>
  )
}
