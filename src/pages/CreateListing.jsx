import React from 'react'

function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
        <form  className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input className='p-3 border rounded-lg ' placeholder='Name' type="text" id='name' maxLength='60' minLength='10' required />
                <textarea className='p-3 border rounded-lg ' placeholder='Description' type="text" id='description'  required />
                <input className='p-3 border rounded-lg ' placeholder='Address' type="text" id='address' required />
                <div className="flex flex-wrap gap-6">
                    <div className="flex gap-2">
                        <input id='sale' type="checkbox" className='w-5'  />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='rent' type="checkbox" className='w-5'  />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='parking' type="checkbox" className='w-5'  />
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='furnished' type="checkbox" className='w-5'  />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input id='offer' type="checkbox" className='w-5'  />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className=" flex items-center gap-2">
                        <input className='p-2 border border-gray-300 rounded-lg'  type="number" id='bedrooms' min='1' max='10' required/>
                        <p>Beds</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input className='p-2 border border-gray-300 rounded-lg'  type="number" id='bathrooms' min='1' max='10' required/>
                        <p>Baths</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input className='p-3 border border-gray-300 rounded-lg'  type="number" id='regularPrice' min='1' max='10' required/>
                        <div className="flex flex-col"><p >Regular Price</p><span className='text-xs text-center'>($ / Month)</span></div>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input className='p-3 border border-gray-300 rounded-lg'  type="number" id='discountPrice' min='1' max='10' required/>
                        <div className="flex flex-col"><p >Discount Price</p><span className='text-xs text-center'>($ / Month)</span></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <p className='font-semibold'>Images:<span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max-6)</span></p>
                <div className="flex gap-4">
                    <input className='p-3 border rounded border-gray-300 w-full' id='images' type="file" accept='image/*' multiple/>
                    <button  className='p-3 text-green-700 border rounded-lg border-green-700 uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-yellow-500 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-75 hover:shadow-lg'>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}

export default CreateListing