import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { toast } from "react-toastify"
 import axios from "axios"
 import {updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,} from '../redux/user/userSlice.js'
  import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"



 let URL = import.meta.env.VITE_SERVER_DOMIN


axios.defaults.baseURL = URL

function Profile() {
  
  
  let url = import.meta.env.VITE_API_URL
  
  const {currentUser} = useSelector(state => state.user)
  const [file,setFile] = useState(undefined)
  const [filePercentage, setFilePercentage]=useState(0)
const [fileUploadError, setFileUploadError]=useState(false)
const [formData, setFormData] = useState({})
const [updateSuccess, setUpdateSuccess] = useState(false);
const [userListing, setUserListing] = useState([])
const fileRef = useRef(null);
// console.log(userListing)
let dispatch = useDispatch()

  // console.log(filePercentage,formData)
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
      
    }
  },[file])
  const handleFileUpload = (file)=>{
    const storage = getStorage(app)
    const fileName =new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on('state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress))
      // console.log(typeof(progress))
      
      if(progress ===100){
        toast.success('Profile image updated')
      }
    },
    (error) => {
      setFileUploadError(true)
      if(error){
        toast.error('File uploadError')
      }
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData, avatar: downloadURL})
        
      })
    }
    )
  }

  const handleChange = (e) => {

    setFormData({...formData, [e.target.id]: e.target.value})

  }
  // console.log(formData)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${url}/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(error.message)
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      if(updateSuccess){
        toast.success('updated data success')
      }
    }  catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error)
    }

  }
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${url}/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      
      const data = await res.json();
      // console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(error.message)
        return;
      }

      
      
      dispatch(deleteUserSuccess(data));
        toast.success(' Account Deleted success')
      
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error)
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`${url}/auth/signout`)
      const data = await res.json()

      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
      toast.error(data.message)
        return
      }
      dispatch(signOutUserSuccess(data))
      toast.success(' Account signOut success')
      
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error(error)
    }
  }
  // console.log(currentUser)
  //firebase storage 
  // allow read;
  // allow write : if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*')

  let handleShowListings = async()=>{
      try {
        let res = await fetch(`${url}/user/listing/${currentUser._id}`,{mode:'no-cors'})
        const data = await res.json()
        // console.log(data)
        setUserListing(data)
        if(data.status ===200){
          toast.success('User List data fetched successfully')
          
        }else if(data.success === false){
          toast.error('Error occured')
        }
        

      } catch (error) {
        toast.error('Error occured')        
      }
  }
  let deleteListing = async(id) => {
    // console.log(id)
    try {
      let res = await fetch(`${url}/listing/deletelist/${id}`,{
        method : 'DELETE'
      })
      const data = await res.json()
    
      if(data.success === false){
        toast.error(data.message)
        return
      }
      setUserListing((prev)=> prev.filter((e)=>e._id !== id))
      toast.success('Deleted SuccessFully')
    } catch (error) {
      
      toast.error(error.message)
    }
    
    // const data = await res.json()
    // console.log(data)
    // let nw =userListing
    // let mnw = nw.filter((e)=>e !== e[id])

 
    // console.log(mnw)
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>  
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} type="file" accept="image/*" hidden  />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" loading="lazy" className="rounded-full h-24 w-24 object-cover self-center mt-2"/>
        <p className="text-center text-sm">
          {fileUploadError ? (<span className="text-red-700">Error image Upload (image must be 2 mb)</span>): filePercentage >0 && filePercentage <100 ?(<span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>) : filePercentage === 100 ? (<span className="text-green-700"> Image successfully Uploaded</span>) : '' }
        </p>
        <input onChange={handleChange} defaultValue={currentUser.username} id="username" type="text"  placeholder="User Name" className="border p-3 rounded-lg"/>
        <input onChange={handleChange} defaultValue={currentUser.email} id="email" type="email"  placeholder="Email" className="border p-3 rounded-lg"/>
        <input onChange={handleChange} id="password" type="password"  placeholder="Password" className="border p-3 rounded-lg"/>
        <button className="bg-yellow-800 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-75 "  >Update</button>
        <Link className= "hover:opacity-75 uppercase text-center text-white text-sm bg-green-600 p-3 rounded-lg" to={'/create-listing'}>create listing</Link>
      </form>  
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>  
      <button onClick={handleShowListings} className="text-green-700 w-full">Show your Post-listing</button>
      {userListing && userListing.length >0 && 
       <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl">Your Listing</h1>
     { userListing.map((e,i)=>{
        return <div key={i} className="border flex p-3 rounded-lg justify-between items-center gap-4">
          <Link to={`/listing/${e._id}`}>
            <img src={e.imageUrls[0]} alt="listing cover" className="w-16 h-16 object-contain rounded-lg" />
          </Link>
          <Link className="text-slate-700 truncate flex-1 font-semibold hover:underline" to={`/listing/${e._id}`}><p>{e.name}</p></Link>
          <div className="flex flex-col items-center">
            <button onClick={()=>deleteListing(e._id)} className="uppercase text-red-700 ">delete</button>
            <Link to={`/update-listing/${e._id}`}>
            <button className="uppercase text-green-700 ">edit</button>
            </Link>
          </div>
        </div>
      })}
      </div>}
    </div>
    

  )
}

export default Profile