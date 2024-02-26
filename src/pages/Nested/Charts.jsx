import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Sector, BarChart, XAxis, YAxis, CartesianGrid, Bar, Cell } from 'recharts';
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
//  if(da){
//   console.log(da)
//  }
  
  }
  
  

  
  
  useEffect(()=>{
    fetchData()
   
   
  },[])
  const getIntroOfPage = (label) => {
    if (label === 'Page A') {
      return "Page A is about men's clothing";
    }
    if (label === 'Page B') {
      return "Page B is about women's dress";
    }
    if (label === 'Page C') {
      return "Page C is about women's bag";
    }
    if (label === 'Page D') {
      return 'Page D is about household goods';
    }
    if (label === 'Page E') {
      return 'Page E is about food';
    }
    if (label === 'Page F') {
      return 'Page F is about baby food';
    }
    return '';
  };
  // const data = [
  //   {name:"dhanush",value:5},
  //   {name:"simbu",value:6},
  //   {name:"surya",value:4},
  //   {name:"vijay",value:5},
  // ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // let ids= payload
      // console.log(ids[0].payload.payload)
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.payload.id} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(payload[0].payload.payload.id)}</p>
          <p className="desc"><b>` {payload[0].payload.payload.id} This ID was had {payload[0].value} OTP`</b></p>
        </div>
      );
    }
    return null;
  }
  return (
    <div className='max-w-screen'>
      <h1 className='text-center p-5 text-2xl text-yellow-600 '>OTP generated chart</h1>
      <hr/>
      <br />
      
   {da &&  <div className='flex flex-col sm:flex-row gap-4 mx-auto justify-around'>
      <div className="piechart mb-auto">
      <PieChart  width={600} height={300}>
      <Pie 
        data={da}
        cx={120}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="Value"
      >
        {da.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />}/>

    </PieChart>
          <p><smal className="text-sm text-yellow-700">This chart provide infromation about a id how many times create otp</smal> </p>
      
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
        <h2>X-axis: Ids of user</h2>
        <h2>Y-axis: Ids how many times OTP generated</h2>
        <p className='text-center  text-yellow-700 pt-5'>Bar chart</p>
      </div>
    </div>}
    </div>
  )
}

export default Charts

// <PieChart width={400} height={400}>
{/* <Pie
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
//<Tooltip />
//</PieChart> */}