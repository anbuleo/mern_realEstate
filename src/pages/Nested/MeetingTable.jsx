import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'


function MeetingTable() {
    let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL
    let [tableData,setTableData] = useState([])
    let [loading,setLoading] =useState(false)
    let [errorPage,setErrorPage] =useState(false)
    let [errormessage,setErrorMessage ] = useState("")
    let [errorstatus,setErrorStatus ] = useState("")
    

    const getData = async()=>{
        try {
          setLoading(true)
            let res = await axios.get('/user/get/allmeeting')
            if(res.status===200){
                setTableData(res.data)
            }
            
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message ||'Error Occured')
            setErrorStatus(error.name ||error.code)
            setErrorPage(true)
        } finally{
          setTimeout(()=>{setLoading(false)},2000)
        }
    }
    // console.log(tableData)
    useEffect(()=>{
        getData()
    },[])


  return (
   <>{errorPage?<Error status={errorstatus} message={errormessage} />:loading ?<div className=' flex justify-center content-center h-80 '><span className="loading loading-spinner loading-lg text-warning"></span></div>: <div className="overflow-x-auto">
   <h2 className='font-bold py-4 uppercase text-center shadow-lg'> Meeting details</h2>
   

   <table className="w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-screen-xl table ">
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
 </div>}</>
  )
}

export default MeetingTable