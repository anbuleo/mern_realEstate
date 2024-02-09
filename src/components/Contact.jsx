import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact({listing}) {
    const [owner, setOwner] = useState(null)
    const [message , setMessage] = useState('')

    const onChangeTextArea = (e)=>{
        setMessage(e.target.value)
    }


    useEffect(()=>{
        const fetchOwner = async()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                let data = await res.json()
                
                setOwner(data)
                // console.log(data)

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchOwner()
        // console.log(listing)
    },[listing.userRef])
  return (
   <>
   {owner && (
    <div className="">
        <p>Contact <span className='font-semibold'>{owner.username}</span> for <span className='font-semibold'> 
            {listing.name.toLowerCase()}</span></p>
            <textarea  className='w-full mb-4 border p-3 rounded-lg' name="message" id="message"  rows="2" value={message} onChange={onChangeTextArea}></textarea>
            <Link className='bg-yellow-600  text-white text-center p-3 uppercase rounded-lg hover:opacity-95' to ={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}>
                    send Message
    </Link>
    </div>

    
   )}
   </>
  )
}

export default Contact