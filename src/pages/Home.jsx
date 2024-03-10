import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import ListingItem from '../components/ListingItem'
import axios from 'axios'
let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL
function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [ saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListing = async()=>{
      try {
        const res = await axios.get('/listing/getlistings?offer=true&limit=4')
        // let data =await res.json()
        // console.log(res)
        setOfferListings (res.data)
        // console.log(offerListings)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async()=>{
      try {
        const res = await axios.get('/listing/getlistings?type=rent&limit=4')
        // let data = await res.json()
        setRentListings(res.data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async() =>{
      try {
        const res = await axios.get('/listing/getlistings?type=sale&limit=4')
        // let data = await res.json()
        setSaleListings(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListing()
  },[])

   return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span><br /> place with us
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          leo Estate is the best place to find your next perfect place to live. <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started..
        </Link>
      </div>
      {/*   swiper  */}
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((lst,i)=>(
          <SwiperSlide key={i}>
            <div style={{background: `url(${lst.imageUrls[0]}) center no-repeat` ,backgroundSize:'cover'}} className="h-[500px]" key={lst._id}>

            </div>
          </SwiperSlide>
        ))
      }
      </Swiper>
      <div className="max-w-6xl mx-4 p-3 flex flex-col gap-6 my-10 ">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((lst)=>(
                    <ListingItem listing={lst} key={lst._id}/>
                  ))
                }
              </div>
            </div>
          ) 
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="mx-auto">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((lst)=>(
                    <ListingItem listing={lst} key={lst._id}/>
                  ))
                }
              </div>
            </div>
          ) 
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((lst)=>(
                    <ListingItem listing={lst} key={lst._id}/>
                  ))
                }
              </div>
            </div>
          ) 
        }
      </div>
      <div className="">
        <p className='text-center'>
          <a href="/" className='text-blue-800 hover:text-blue-500'>Back to Top</a>
        </p>
      </div>
      <footer className='bg-yellow-500'>
        <div className="">
          <p className='text-center pt-4 pb-4'>copy rights &nbsp; &copy; </p>
        </div>
      </footer>
    </div>
  
  )
}

export default Home