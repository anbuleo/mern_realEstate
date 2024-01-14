import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
 
function ListIng() {
  SwiperCore.use([Navigation])
  const params = useParams()
  const [slisting, setListing] = useState(null)

  useEffect(()=>{
    const fetchListing = async()=>{
      // console.log(params.listingId)
      const res = await fetch(`/api/listing/getListing/${params.listingId}`)
      const data = await res.json()
      if(data.success === false){
        toast.error('Unable to Fetch data')
        return
      }
      setListing(data.listing)
    }
    fetchListing()
    console.log(slisting)
  },[])
  // console.log(slisting)
  return (
    <main>
      
      <>
      {slisting &&  (<Swiper navigation >
        {
          slisting.imageUrls.map((urls,i)=> (<SwiperSlide key={urls}>
                <div className="h-[550px]" style={{background : `url(${urls}) center no-repeat`, backgroundSize: 'cover'}}></div>
            </SwiperSlide>)
          )
        }
      </Swiper>)
}
      </>
    </main>
  )
}

export default ListIng