import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error({status,message}) {
    // console.log(status,message)
    let navigate =useNavigate()
  return (
    <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
    <div class="rounded-lg bg-white p-8 text-center shadow-xl">
      <h1 class="mb-4 text-4xl font-bold">{status}</h1>
      <p class="text-gray-600">{message}</p>
      <p onClick={()=>navigate('/')} class="mt-4 inline-block rounded bg-warning px-4 py-2 font-semibold text-white hover:bg-opacity-80"> Go back to Home </p>
    </div>
  </div>
  )
}

export default Error