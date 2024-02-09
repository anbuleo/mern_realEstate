import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Users() {
    let [otpData,setOtpdata] =useState([])
    let fetchData = async()=>{
      try {
        let res = await axios.get('/otp/getalluserotp')
        toast.success(res.data.message)
        // let data =await res.json()
        // console.log(res.data.user)
        setOtpdata(res.data.user)
        // console.log((otpData[0].createdAt).split('T'))
      } catch (error) {

        console.log(error)
        toast.error('Error occured')
      }
    }

    useEffect(()=>{
      fetchData()
    },[])
  return (
    <div className="">
      <h2 className='font-bold py-4 uppercase text-center shadow-lg'> User details</h2>
      <table className="w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-screen-xl">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr >
            <th scope="col" className="px-6 py-3">S.no</th>
            <th scope="col" className="px-6 py-3">User ID</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Code</th>
            <th scope="col" className="px-6 py-3">Created At</th>
            
          </tr>

        </thead>
        <tbody>
        {
          otpData && otpData.map((e,i)=>{
            return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={i}>
            <td  class="px-4 py-4 ">
              {i+1}
            </td>
            <td  class="px-4 py-4 ">
              {e.ref}
            </td>
            <td  class="px-4 py-4 ">
              {e.role}
            </td>
            <td  class="px-6 py-4 ">
              {e.email}
            </td>
            <td  class="px-4 py-4 ">
              {e.otpcode}
            </td>
            <td  class="px-6 py-4 ">
              {e.createdAt.split('T')[0]} <br/>{ new Date('1970-01-01T' + e.createdAt.split('T')[1].split('.')[0] + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'Asia/Calcutta',hour12:true,hour:'numeric',minute:'numeric'}
  )}
            </td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Users