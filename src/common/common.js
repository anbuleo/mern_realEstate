import axios from 'axios'


let URL = import.meta.env.VITE_API_URL

axios.defaults.baseURL = URL
console.log(URL)

export const getUser = async({username})=>{
    try {
        const res = await axios.get(`/user/getuser/${username}`)
        // console.log(res)
        return res
    } catch (error) {
        return{error:"username doesn't match"}        
    }
}


export async function generateOTP(username,{subject},values){
   
    console.log(username)
   
    // console.log(otpVlaues)
    try {
        
        const res  = await axios.get('/otp/genrateotp', { params : { username }});
        console.log(res.data.code,res)
        
        // const {data , status } = await axios.get('/user/genrateotp', { params : { username }});
      
        
        // send mail with the OTP
        if(res.status === 201){
            let usereemail = await getUser({ username });
            

            // let { data : { email }} = await getUser({ username });
            // console.log(usereemail,subject)
            
            values.otpcode=res.data.code
            values.message = subject
                        //  console.log(values)
           await  axios.post('/otp/create-otplist',{...values})
                
            let text = `Your OTP is ${res.data.code}.  `;
            await axios.post('/user/registerMail', { username, userEmail: usereemail.data.email, text, subject })
        }
        return Promise.resolve(res.data.code);
    } catch (error) {
        
        console.log(error)
        return Promise.reject({ error });
    }
    
}

export async function verifyOTP({  code }){
    
    console.log( code)

    try {
       const  { data, status } = await axios.get('/otp/verifyotp', { params : {  code }})
      
      

     
       return { data, status }
       
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}