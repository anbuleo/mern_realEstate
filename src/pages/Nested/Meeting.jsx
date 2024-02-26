import React, { useContext, useRef, useState } from 'react'
import { MeetingDataContext } from '../../context/MeetingContext'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

function Meeting() {
    let {meetingData,setMeetingData,updateMeetingList} = useContext(MeetingDataContext)
    const [trigger, setTrigger] = useState(false);
    let butref = useRef()
    // let [mDatas, setMdatas] = useState(meetingData)
    let navigate = useNavigate()
    let url = import.meta.env.VITE_API_URL
    const MeetingSchema = Yup.object().shape({
        subject : Yup.string().required('*Subject Required').min(4,'User Name atlest 4 character'),
        date : Yup.string().required('*Date & Time Required'),
        url : Yup.string().required('*Url Required')
      })
   

    let handleDeleteId = (i)=>{
        // e.perventD
        // efault()
        // console.log(e)
        // let newData = [...meetingData]
        // newData.splice(i,1)
        // setMeetingData(newData)
        updateMeetingList(i)
        
        
       
        // let filt = meetingData.filter((a)=> a._id != id)
       
        
    }
    const handleAddValues = async(values)=>{
      butref.current.disabled = true
      // console.log()
       try {
        // console.log(values)
        const res = await fetch(`${url}/user/createMeeting`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });  
          
          // console.log(res)
          if(res.status === 201){
            
            toast.success("Meet link send Successfully")
            navigate('/adminlog/meetingtable')
          }
          // console.log(res)    
        } catch (error) {
        console.log(error)
       }
        
    }
    
  return (
    <div className="px-2 max-w-screen-xl">
        <p className='text-center p-2 text-2xl'> Meeting</p>
        <Formik initialValues={{
            subject:'',
            date:'',
            url:'',
            userIds:meetingData.map((a)=>a._id),
            userEmails: meetingData.map((a)=>a.email),
            totalmembers:meetingData.length,
           

        }}
        validationSchema={MeetingSchema}
        onSubmit={(values)=>handleAddValues(values)}
        >
            {({errors, handleBlur, handleSubmit, touched, handleChange})=>(
                 <form  onSubmit={handleSubmit}>
                 <div className='flex p-3 gap-3 bg-white'>
                  <div className="flex flex-col">
                  <label className='my-auto'>Subject : 
                  <input className='bg-gray-100 p-2' type="text" name="subject" id="subject" onBlur={handleBlur} onChange={handleChange} /></label>
                  {errors.subject && touched.subject ? <span className='text-red-500 mx-auto'>{errors.subject}</span>:null}
                  </div>
                  <div className="flex flex-col">
                  <label className='my-auto'>Time & Date :
                  <input className='bg-gray-100 p-2'  type="datetime-local" name="date" id="date" onBlur={handleBlur} onChange={handleChange} /> </label>
                  {errors.date && touched.date ? <span className='text-red-500 mx-auto'>{errors.date}</span>:null}
                  </div>
                  <div className="flex flex-col">
                  <label className='my-auto'>Paste Meeting Link: 
                  <input className='bg-gray-100 p-2' type="url" name="url" id="url" onBlur={handleBlur} onChange={handleChange} /> </label>
                  {errors.url && touched.url ? <span className='text-red-500 mx-auto'>{errors.url}</span>:null}
                  </div>
                 </div>
                 <div className="text-center p-2">
                  <button ref={butref} disabled={false} className='bg-yellow-500 text-white disabled:bg-yellow-100 hover:bg-yellow-300 px-1 py-2 rounded-lg'>Create Meeting</button>
                 </div>
                  <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-screen max-w-screen-xl">
                      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                          <th scope="col" className="px-6 py-3">s.no</th>
                          <th scope="col" className="px-6 py-3">Id</th>
                          <th scope="col" className="px-6 py-3">Email</th>
                          <th scope="col" className="px-6 py-3">Remove</th>
                      </tr>
                      </thead>
                      {
                          meetingData && meetingData.map((e,i)=>{
                              return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={i}>
                              <td scope="col" className="px-6 py-3">{i+1}</td>
                              <td scope="col" className="px-6 py-3">{e._id}</td>
                              <td scope="col" className="px-6 py-3">{e.email}</td>
                              <td scope="col" className="px-6 py-3"><button type='button' onClick={()=>handleDeleteId(i)} className='bg-red-700 px-3 py-1 rounded-lg text-white'>Del</button></td>
                              </tr>
                          })
                      }
                  </table>
              </form>
            )}
       
        </Formik>
    </div>
  )
}

export default Meeting