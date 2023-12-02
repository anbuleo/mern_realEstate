import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { toast } from "react-toastify"
 

function Profile() {
  let fileRef = useRef(null)
  const {currentUser} = useSelector(state => state.user)
  const [file,setFile] = useState(undefined)
  const [filePercentage, setFilePercentage]=useState(0)
const [fileUploadError, setFileUploadError]=useState(false)
const [formData, setFormData] = useState({})

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
  // console.log(currentUser)
  //firebase storage 
  // allow read;
  // allow write : if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*')

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>  
      <form className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" accept="image/*" hidden ref={fileRef} />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" loading="lazy" className="rounded-full h-24 w-24 object-cover self-center mt-2"/>
        <p className="text-center text-sm">
          {fileUploadError ? (<span className="text-red-700">Error image Upload (image must be 2 mb)</span>): filePercentage >0 && filePercentage <100 ?(<span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>) : filePercentage === 100 ? (<span className="text-green-700"> Image successfully Uploaded</span>) : '' }
        </p>
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