import {Link} from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

function SignIn() {

  const {loading,error} = useSelector((state)=> state.user)

 let navigate = useNavigate()
 let dispatch = useDispatch()
  
  const UserSchema = Yup.object().shape({
    
    email : Yup.string().email('Invalid Email').required('* Required'),
    password : Yup.string().required('* Required').min(6,'Atlest 6 characters')
  })


 const handleAddUser = async(values)=>{
  try {
    dispatch(signInStart())
    const res = await fetch('api/auth/signin',{
      method:'post',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    
    
    if(res.status===200)    
    {
      toast.success('User Login Successfully')
      dispatch(signInSuccess(data))
      navigate('/')
    }
    else if(res.status ===404) {
      toast.error('Email Not Found!')
    }
    else if(res.status === 401) {
      toast.error('Password Not Match!!')
    }
  } catch (error) {
    console.log(error)
    dispatch(signInFailure(error.message))
      toast.error("Error Occoured")
  }
}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> 
        Sign In
      </h1>
      <Formik initialValues={{
        
        email : '',
        password : ''
      }}
      validationSchema={UserSchema}
      onSubmit={(values)=>handleAddUser(values)}>
        {({errors, handleBlur, handleSubmit, touched, handleChange})=>(
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
          <input type="email" placeholder='Email' className='border p-3 rounded-lg ' id='email' name='email' onBlur={handleBlur} onChange={handleChange}/>
          {errors.email && touched.email ? <div style={{color : 'red'}}>{errors.email}</div>:null}
          <input type="password" placeholder='Password' className='border p-3 rounded-lg ' id='password' name='password' onBlur={handleBlur} onChange={handleChange}/>
          {errors.password && touched.password ? <div style={{color : 'red'}}>{errors.password}</div>:null}
          <button type='submit' className='bg-yellow-900 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-75'>Sign In</button>
          <OAuth/>
        </form>
        )}
      
      </Formik>
      <div className="flex justify-end gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn