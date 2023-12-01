import { useSelector } from "react-redux"

function Profile() {
  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>  
      <form className="flex flex-col gap-3">
        <img src={currentUser.avatar} alt="profile" loading="lazy" className="rounded-full h-24 w-24 object-cover self-center mt-2"/>
        <input id="username" type="text"  placeholder="User Name" className="border p-3 rounded-lg"/>
        <input id="email" type="email"  placeholder="Email" className="border p-3 rounded-lg"/>
        <input id="password" type="password"  placeholder="Password" className="border p-3 rounded-lg"/>
        <button className="bg-yellow-800 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-75 " >Update</button>
      </form>  
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>  
    </div>
    
  )
}

export default Profile