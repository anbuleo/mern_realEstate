import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
import { GetallOtpsAndUser } from '../../common/common';

function Charts() {
    let [otpData,setOtpData] = useState([])
    let [userData,usersetOtpData] = useState([])

  const fetchData = async()=>{
    try {
      // let res = await axios.get('/otp/gettotallotpsbyusername') 
      let res = await GetallOtpsAndUser()
      // console.log(res)
      if(res ){
        setOtpData(res)
       
        
      }
      
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  let da = []
  if(otpData){
    let filterData = otpData.reduce((acc, value) =>({
      ...acc,
      [value.ref]: (acc[value.ref] || 0) + 1
   }), {});
  //  usersetOtpData(filterData)
  //  console.log(filterData)
//    var convert  = Object.keys(filterData).map(function(key)  
//   {  
//    return [key, filterData[key]];  
//  });  
//  console.log(filterData); 
 
 
 
 for (const [key, value] of Object.entries(filterData)) {
  da.push({id: `${key}`, Value:Number(`${value}`)})
    
 }
 if(da){
  console.log(da)
 }
  
  }
  
  

  
  
  useEffect(()=>{
    fetchData()
   
   
  },[])
  // const data = [
  //   {name:"dhanush",value:5},
  //   {name:"simbu",value:6},
  //   {name:"surya",value:4},
  //   {name:"vijay",value:5},
  // ]
  return (
    <div className='w-screen'>
      <h1 className='text-center p-5 text-2xl text-yellow-600 '>OTP generated chart</h1>
   {da &&  <div className='flex flex-col sm:flex-row gap-4  justify-around'>
      <div className="piechart">
        
      <PieChart width={400} height={400}>
          <Pie
            dataKey="Value"
            isAnimationActive={false}
            data={da}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
        </PieChart>
        <p className='text-center  text-yellow-700'>Pie chart</p>
      </div>
      <div className="barchart mt-6">
      <BarChart
          width={500}
          height={300}
          data={da}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="id" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
        <p className='text-center  text-yellow-700 pt-5'>Bar chart</p>
      </div>
    </div>}
    </div>
  )
}

export default Charts