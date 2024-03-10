import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {MeetingDataContext} from '../../context/MeetingContext'
import { useNavigate } from 'react-router-dom'
import Error from '../../components/Error'

function Users() {
    let [otpData,setOtpdata] =useState([])
    let [inputData,setInputdata] =useState([])
    let [loading,setLoading] =useState(false)
    let [errorPage,setErrorPage] =useState(false)
    const [trigger, setTrigger] = useState(false);
    let [errormessage,setErrorMessage ] = useState("")
    let [errorstatus,setErrorStatus ] = useState("")
    // console.log(MeetingDataContext)
    let {meetingData,SetMeetingData} = useContext(MeetingDataContext)
    let navigate = useNavigate()


   
    let fetchData = async()=>{
      
      try {
        // let res = await axios.get('/otp/getalluserotp')

        setLoading(true)
        let res1 = await axios.get('/otp/gettotallotpsbyusername')
        // console.log(res1)
        toast.success(res1.data.message)
        // let data =await res.json()
        // console.log(res.data.user)
        setOtpdata(res1.data.user)
        // console.log((otpData[0].createdAt).split('T'))
      } catch (error) {

        // console.log(error)
        setErrorPage(true)
        setErrorMessage(error.message ||'Error Occured')
        setErrorStatus(error.name ||error.code)
        // console.log(error.name )
        toast.error('Error occured')
      }finally { 
        setTimeout(()=>{setLoading(false)},2000)
      }
    } 

    useEffect(()=>{
      fetchData()
    },[])
   
    let handleAddIds = (id)=>{
      if(inputData){
        let selected = inputData.includes(id)
        if(!selected){
          setInputdata(prev=>[...prev,id])
          return
        }
      }
      // setInputdata(prev=>[...prev,id])
       
    }
    let handleRemoveIds =(id)=>{
      if(inputData){
        let index = inputData.indexOf(id)
        if(index>=0){
            inputData.splice(parseInt(index),1)

        }
        setTrigger(prev => !prev)
        // console.log(inputData.length)
      }
    }
   ;
    useEffect(()=>{
      // console.log(inputData,meetingData)
    },[inputData],[trigger])
    
     
   const handelNavigate = async()=>{
    // localStorage.setItem('appData', JSON.stringify(inputData));
    SetMeetingData(inputData)
    navigate('meeting')
   }
  return (
  <>{errorPage?<Error status={errorstatus} message={errormessage} />:loading ?<div className=' flex justify-center content-center h-80 '><span className="loading loading-spinner loading-lg text-warning"></span></div>: <div className="overflow-x-auto">
  <h2 className='font-bold py-4 uppercase text-center shadow-lg'> User details</h2>
  <p className='text-right p-4'><button className='bg-yellow-500 rounded-lg p-2  hover:bg-yellow-700 disabled:bg-white' disabled={inputData.length===0} onClick={handelNavigate}>Create Meeting</button></p>

  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr >
        <th scope="col" className="px-4 py-3">S.no</th>
        <th scope="col" className="px-4 py-3">User ID</th>
        <th scope="col" className="px-4 py-3">Role</th>
        <th scope="col" className="px-4 py-3">Email</th>
        
        <th scope="col" className="px-4 py-3">Created At</th>
        
      </tr>

    </thead>
    <tbody>
    {
      otpData && otpData.map((e,i)=>{
        return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={i}>
        <td  class="px-4 py-4 ">
          <input type='checkbox' value={e}  onClick={(es)=>{es.target.checked?handleAddIds(e):handleRemoveIds(e)}}/>{i+1}
        </td>
        <td  class="px-4 py-4 ">
          {e._id}
        </td>
        <td  class="px-4 py-4 ">
          {e.role}
        </td>
        <td  class="px-4 py-4 ">
          {e.email}
        </td>
        
        <td  class="px-4 py-4 ">
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
</div> }</>
  )
}

export default Users