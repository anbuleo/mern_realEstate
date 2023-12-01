import {Link} from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'
function SignUp() {

 let navigate = useNavigate()
  
  const UserSchema = Yup.object().shape({
    username : Yup.string().required('* Required').min(4,'User Name atlest 4 character'),
    email : Yup.string().email('Invalid Email').required('* Required'),
    password : Yup.string().required('* Required').min(6,'Atlest 6 characters')
  })


 const handleAddUser = async(values)=>{
  try {
    const res = await fetch('api/auth/signup',{
      method:'post',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    
    if(res.status===201)
    {
      toast.success('User Created Successfully')
      navigate('/sign-in')
    }
  } catch (error) {
      toast.error("Error Occoured")
  }
}


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> 
        Sign Up
      </h1>
      <Formik initialValues={{
        username : '',
        email : '',
        password : ''
      }}
      validationSchema={UserSchema}
      onSubmit={(values)=>handleAddUser(values)}>
        {({errors, handleBlur, handleSubmit, touched, handleChange})=>(
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type="text" placeholder='User Name' className='border p-3 rounded-lg ' id='username' name='username' onBlur={handleBlur} onChange={handleChange}/>
          {errors.username && touched.username ? <div style={{color : 'red'}}>{errors.username}</div>:null}
          <input type="email" placeholder='Email' className='border p-3 rounded-lg ' id='email' name='email' onBlur={handleBlur} onChange={handleChange}/>
          {errors.email && touched.email ? <div style={{color : 'red'}}>{errors.email}</div>:null}
          <input type="password" placeholder='Password' className='border p-3 rounded-lg ' id='password' name='password' onBlur={handleBlur} onChange={handleChange}/>
          {errors.password && touched.password ? <div style={{color : 'red'}}>{errors.password}</div>:null}
          <button type='submit' className='bg-yellow-900 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-75'>Sign up</button>
          <OAuth />
        </form>
        )}
      
      </Formik>
      <div className="flex justify-end gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp