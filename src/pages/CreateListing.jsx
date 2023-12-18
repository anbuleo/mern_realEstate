import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { toast } from 'react-toastify'
import { app } from '../firebase'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
   let [files, setFiles] = useState([])
   let [formData, setFormData] = useState({
    imageUrls : [],
    name : '',
    description : '',
    address : '',
    type : 'rent',
    bedrooms : 1,
    bathrooms : 1,
    regularPrice : 50,
    discountPrice : 0,
    offer : false,
    parking: false,
    furnished : false,


   })
  
   let [imageUploadError, setImageUploadError] = useState(false)
   let [uploading, setUpLoading] = useState(false)
   let [loading, setLoading] = useState(false)
   let [error,setError] = useState(false)
   
   
  

let handleSubmitImages =(e)=>{
        if(files.length > 0 && files.length < 7) {
            setImageUploadError(false);
            const promises = [];
            for(let i=0; i<files.length; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({
                    ...formData,
                    imageUrls : formData.imageUrls.concat(urls)
                })
                console.log(formData)
                setImageUploadError(false)
            })
            .catch((err)=>{
                console.log(err)
                setImageUploadError('Image upload failed (2 mb max per image)')
                toast.error('Image upload failed (2 mb max per image')
            })
        }
        else {
            setImageUploadError('You can only upload 6 image per listing')
            toast.error('You can only upload 6 image per listing')
        }

      
}
const storeImage = async ( file) =>{
    return new Promise((resolve, reject)=>{
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100

            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL)
                })
            }
        )
    })
}
let handleDeleteImage = (i) => {
        setFormData({
            ...formData,
            ImageUrls : formData.ImageUrls.filter((_,index)=> index !== i )
        })

}
let handleChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
        setFormData({
            ...formData,
            type: e.target.id
        })
       
    }
    if(e.target.id === 'parking' ||e.target.id === 'furnished' ||e.target.id === 'offer' ){
        setFormData({
            ...formData,
            [e.target.id] : e.target.checked
        })
        
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type ==='textarea'){
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    

}
console.log(formData)

let handleSave = async (e) => {
    e.preventDefault()
    try {
        
        if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
        setLoading(true)
      
        setError(false);
        
        const res = await fetch('/api/listing/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
            }),
          });
          const data = await res.json();
          if(res.status === 201){
            toast.success('Created Successfully')
          }
          
         
          setLoading(false);
          if (data.success === false) {
            setError(data.message);
            toast.error('Error occured')
          }
          navigate(`/listing/${data._id}`);



        
    } catch (error) {
        setLoading(false)
        setError(error.message)
        console.log(error)
        toast.error('Error')
    }

}
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
        <form onSubmit={handleSave}  className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input className='p-3 border rounded-lg ' onChange={handleChange} value={formData.name} placeholder='Name' type="text" id='name' maxLength='60' minLength='3' required />
                <textarea className='p-3 border rounded-lg ' onChange={handleChange} value={formData.description}  placeholder='Description' type="text" id='description'  required />
                <input className='p-3 border rounded-lg ' onChange={handleChange} value={formData.address} placeholder='Address' type="text" id='address' required />
                <div className="flex flex-wrap gap-6">
                    <div className="flex gap-2">
                        <input id='sale' onChange={handleChange} checked={formData.type === 'sale'} type="checkbox" className='w-5'  />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='rent' type="checkbox" onChange={handleChange} checked={formData.type === 'rent'} className='w-5'  />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='parking' type="checkbox" className='w-5' onChange={handleChange} checked={formData.parking } />
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='furnished' type="checkbox" className='w-5' onChange={handleChange} checked={formData.furnished} />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='offer' type="checkbox" className='w-5' onChange={handleChange} checked={formData.offer } />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className=" flex items-center gap-2">
                        <input onChange={handleChange} value={formData.bedrooms} className='p-2 border border-gray-300 rounded-lg'  type="number" id='bedrooms' min='1' max='10' required/>
                        <p>Beds</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input onChange={handleChange} value={formData.bathrooms}  className='p-2 border border-gray-300 rounded-lg'  type="number" id='bathroo
                        ms' min='1' max='10' required/>
                        <p>Baths</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input onChange={handleChange} value={formData.regularPrice} className='p-3 border border-gray-300 rounded-lg'  type="number" id='regularPrice' min='50' max='1000000' required/>
                        <div className="flex flex-col"><p >Regular Price</p>
                        {formData.type === 'rent' &&(<span className='text-xs text-center'>($ / Month)</span>)}
                        </div>
                    </div>
                    {formData.offer && (<div className=" flex items-center gap-2">
                        <input onChange={handleChange} value={formData.discountPrice} className='p-3 border border-gray-300 rounded-lg'  type="number" id='discountPrice' min='0' max='1000000000000000000000' required/>
                        <div className="flex flex-col"><p >Discount Price</p><span className='text-xs text-center'>($ / Month)</span></div>
                    </div>)}
                    
                </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <p className='font-semibold'>Images:<span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max-6)</span></p>
                <div className="flex gap-4">
                    <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border rounded border-gray-300 w-full' id='images' type="file" accept='image/*' multiple/>
                    <button type='button' onClick={handleSubmitImages} className='p-3 text-green-700 border rounded-lg border-green-700 uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                {
                    formData.imageUrls.length >0 && formData.imageUrls.map((url,i)=>{
                       return <div key={i} className="flex justify-between p-3 border items-center">
                            <img src={url} alt="Listing image" className='w-20 h-20 object-contain rounded-lg' />
                            <button onClick={()=>handleDeleteImage(i)} type='button' className='p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-75' >Delete</button>
                        </div>
                    })
                }
                <button disabled={loading} className='p-3 bg-yellow-500 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-75 hover:shadow-lg'>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}

export default CreateListing