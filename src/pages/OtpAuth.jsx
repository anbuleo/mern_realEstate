import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { generateOTP, verifyOTP } from '../common/common';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL

function OtpAuth() {
  const dispatch = useDispatch()

    
    const [otp, setOtp] = useState('');
    let navigate = useNavigate()
    let params =useParams()

    let validateOtp = async ()=>{
    
    
        
          try {
            let { status } = await verifyOTP({ code : otp })
            let res =await axios.get(`/otp/getuser/${params.id}`)
            // console.log(res)
            if(res.data){
              dispatch(signInSuccess(res.data))
            }
            if(status === 201){
              toast.success('Verified')
              
            
              navigate('/')
            }
          } catch (error) {
            console.log(error)
          }
        
     
    }
    useEffect(()=>{ 
       if(otp.length === 4){
      validateOtp()
       }
    },[otp])
 
        // console.log(otp,params.id)
        let subject ={subject:'resend otp'} 
   const resendOtp = async() =>{
      try {
        let res =await axios.get(`/otp/getuser/${params.id}`)
        if(res){
          let otpVlaues = {
            email:res.data.email,
            message:'',
            ref:res.data._id,
            otpcode:''
        }
        // console.log(`${data.username},${subject},${otpVlaues}`)
      //  generateOTP(data.username,subject,otpVlaues)
          generateOTP(res.data.username,subject,otpVlaues)
        }
      } catch (error) {
        console.log(error)
        toast.error('Error occured')
      }
   }
    
  return (
   
    <div className='flex justify-center '>
        <div className="max-w-fit h-max text-center shadow-lg shadow-black bg-yellow-400 p-10  m-10 rounded-lg">
               <div className=""> 
                <p className="text-center">Enter  OTP</p>
               </div>
               <div className="p-6  ">
               <OtpInput className='mx-auto'
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input  {...props} />}
                />
               </div>
               <p className="">
                cann't get otp? <span className='text-blue-600 cursor-pointer' onClick={resendOtp}>resend</span>
               </p>
        </div>
    </div>
  )
}

export default OtpAuth