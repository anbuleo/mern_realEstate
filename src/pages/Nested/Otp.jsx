import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Error from '../../components/Error'


let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL

function Otp() {
  let [userData,setUserData] = useState([])
  let [tableData,setTableData] = useState([])
  let [loading,setLoading] =useState(false)
  let [errorPage,setErrorPage] =useState(false)
  let [errormessage,setErrorMessage ] = useState("")
  let [errorstatus,setErrorStatus ] = useState("")

  let fetchData = async()=>{
    try {
      setLoading(true)
      let res1 = await axios.get('/otp/getalluserotp')
      let res = await axios.get('/otp/gettotallotpsbyusername')
      // console.log(res.data)
     
      if(res.data.user){
        setTableData(res1.data.user)
        setUserData(res.data.user)
        
      }
      
    } catch (error) {
      toast.error('error occured')
      setErrorMessage(error.message ||'Error Occured')
      setErrorStatus(error.name ||error.code)
      setErrorPage(true)
      // console.log(error)
    } finally{
      setTimeout(()=>{setLoading(false)},2000)
    }
  }
  

  useEffect(()=>{
    fetchData()
  },[],[tableData])
  let changeValue = async(e)=>{
    try {
      if(e.target.value){
        let userDatas = await axios.get(`/otp/getotpbyid/${e.target.value}`)
        if(!userDatas){
          toast.warning(userDatas.data.message)
        }
        else if(userDatas.data.datas.length >0){
          toast.success(userDatas.data.message)
          setTableData(userDatas.data.datas)
          // console.log(userDatas.data)
        }
        else{
          toast.warning(userDatas.data.message)
        }
      }
      
    } catch (error) {
      toast.error('Error occurs')
      setErrorPage(true)
      // console.log(error)
    }
    // console.log(e.target.value)
  }
  return (
    <>
    {errorPage?<Error status={errorstatus} message={errormessage} />:loading ?<div className=' flex justify-center content-center h-80 '><span className="loading loading-spinner loading-lg text-warning"></span></div>:<div className='overflow-x-auto'>
      <p className='text-yellow-700 text-2xl text-center w-screen p-4'>OTP List By Username</p>
      <div className="inputotp mb-4">
        <form >
        <label className='' for="username">Choose Username: &nbsp;</label>
        <select  className=''  name="username" id="username" onChange={changeValue}>
          {
            userData && userData.map((e,i)=>{
              return <option key={i} value={e._id}>{e.username}</option>
            })
          }
        </select>
        </form>
      </div>
      <div className="table">
      <table className="w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-screen-xl">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr >
            <th scope="col" className="px-6 py-3">S.no</th>
            <th scope="col" className="px-6 py-3">User ID</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Otp</th>
            <th scope="col" className="px-6 py-3">Created At</th>
            
          </tr>

        </thead>
        <tbody>
        {
          tableData && tableData.map((e,i)=>{
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
    </div>}
    </>
  )
}

export default Otp