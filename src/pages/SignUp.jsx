import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> 
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='User Name' className='border p-3 rounded-lg ' id='username' />
        <input type="email" placeholder='Email' className='border p-3 rounded-lg ' id='email' />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg ' id='password' />
        <button className='bg-yellow-900 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-75'>Sign up</button>
      </form>
      <div className="flex justify-end gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp