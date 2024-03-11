import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { generateOTP } from '../common/common'


function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let url = import.meta.env.VITE_API_URL
  
    const handleGoogleClick = async()=>{
       
      
    
        try {
           
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
           
    
            const result =await signInWithPopup(auth,provider)
            const res = await fetch(`${url}/auth/google`,{
                method : 'POST',
    
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({
                    name: result.user.displayName,
                    email:result.user.email,
                    photo : result.user.photoURL,
                })
            })
            const data = await res.json()
            // console.log(data)
            localStorage.setItem('token',data.token)
            let subject ={subject:'Login your account'}
           
                if(data.rest.email){
                    let otpVlaues = {
                        email:data.rest.email,
                        message:'',
                        ref:data.rest._id,
                        otpcode:''
                    }
                    // console.log(`${data.username},${subject},${otpVlaues}`)
                   generateOTP(data.rest.username,subject,otpVlaues)
                     
                    navigate(`/otpauth/${data.rest._id}`);
                   

                }
          
           
           
        } catch (error) {
            console.log('could not sign in with google', error)
        }
        
    
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95'>continue with google</button>
  )
}

export default OAuth