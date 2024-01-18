import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import {useSelector} from 'react-redux'
import 'swiper/css/bundle'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact'
 
function ListIng() {
  SwiperCore.use([Navigation])
  const params = useParams()
  const [slisting, setListing] = useState(null)
  const {currentUser} = useSelector((state)=> state.user)
  const [contact,setConatact] = useState(false)

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
    // console.log(slisting,currentUser)
  },[])
  // console.log(slisting)
  return (
    <main>
      
      <>
      {slisting &&  (<div><Swiper navigation >
        {
          slisting.imageUrls.map((urls,i)=> (<SwiperSlide key={urls}>
                <div className="h-[550px]" style={{background : `url(${urls}) center no-repeat`, backgroundSize: 'cover'}}></div>
            </SwiperSlide>)
          )
        }
      </Swiper>
      <div className="flex flex-col  max-w-4xl mx-auto p-3 my-7 gap-4">
      <p className='text-2xl font-semibold'>
              {slisting.name} - ${' '}
              {slisting.offer
                ? slisting.discountPrice.toLocaleString('en-US')
                : slisting.regularPrice.toLocaleString('en-US')}
              {slisting.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {slisting.address}
            </p>
       <div className="flex gap-4">
       <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
          {slisting.type ==='rent' ? 'For Rent':  'For Sale'}
        </p>
        {slisting.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+slisting.regularPrice - +slisting.discountPrice} OFF
                </p>
              )}
              
       </div>
        <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {slisting.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {slisting.bedrooms > 1
                  ? `${slisting.bedrooms} beds `
                  : `${slisting.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {slisting.bathrooms > 1
                  ? `${slisting.bathrooms} baths `
                  : `${slisting.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {slisting.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {slisting.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {
              currentUser && currentUser._id !== slisting.userRef && (
                  <button  onClick={() => setConatact(true)} className='p-3 bg-yellow-600 text-white rounded-lg uppercase hover:opacity-95 '>
              Contact Landlord
            </button>
              )
            }
             {contact && <Contact listing={slisting} />}
      </div>
      </div>
      )
}
      </>
    </main>
  )
}

export default ListIng