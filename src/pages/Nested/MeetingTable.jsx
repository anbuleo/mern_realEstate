import axios from 'axios'
import React, { useEffect, useState } from 'react'


function MeetingTable() {
    let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL
    let [tableData,setTableData] = useState([])
    

    const getData = async()=>{
        try {
            let res = await axios.get('/user/get/allmeeting')
            if(res.status===200){
                setTableData(res.data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    console.log(tableData)
    useEffect(()=>{
        getData()
    },[])


  return (
    <div className="">
      <h2 className='font-bold py-4 uppercase text-center shadow-lg'> Meeting details</h2>
      

      <table className="w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-screen-xl">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr >
            <th scope="col" className="px-6 py-3 text-center">S.no</th>
            
            <th scope="col" className="px-6 py-3 text-center">Subject</th>
            <th scope="col" className="px-6 py-3 text-center">Total Members</th>
            <th scope="col" className="px-6 py-3 text-center">Meeting Time</th>
            <th scope="col" className="px-6 py-3 text-center">Created At</th>
            
          </tr>

        </thead>
        <tbody>
        {
          tableData && tableData.map((e,i)=>{
            return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center" key={i}>
            <td  class="px-4 py-4 text-center">
              {i+1}
            </td>
            <td  class="px-4 py-4 ">
              {e.subject}
            </td>
            <td  class="px-4 py-4 mx-auto">
              {e.userEmails.length}
            </td>
            <td  class="px-6 py-4 ">
              {e.date.split('T')[0]}<br/>{e.date.split('T')[1].split(':')[0]>= 12 && (e.date.split('T')[1].split(':')[0]-12 || 12) + ':' +e.date.split('T')[1].split(':')[1]+ ' PM' || (Number(e.date.split('T')[1].split(':')[0]) || 12) + ':' + e.date.split('T')[1].split(':')[1] + ' AM'}
            </td>
            
            <td  class="px-6 py-4 mx-auto">
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

export default MeetingTable