import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  
  const navigate =useNavigate();
 async function checkUser(e){
  e.preventDefault();
  try{
    const response=await axios.post("http://localhost:8000/login",{
      email:email,
      password:password,
    },{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }
    );
   
    const { token, role, isNew } = response.data;

   
  if(response.data){
      localStorage.setItem("userEmail",email);
    
      navigate('/products')
    
    
  }
//console.log(response.data)

  }catch(error){
    console.log(error)
  }

  }

  return (
    <>
   
   <div className="flex justify-center items-center h-screen bg-stone-900 ">
  <div className="bg-stone-500 rounded-lg p-8 ">
           <div className='grid grid-cols-1'>
            <h2 className='my-3 font-bold text-2xl text-stone-900'
             >Login</h2>
            <input className='my-2 p-2 text-white bg-stone-900 rounded-md placeholder:text-stone-500' type='text' placeholder='user/ email address'onChange={e=>{setemail(e.target.value)}}/>
            <input className="my-2 p-2  bg-stone-900 text-white rounded-md placeholder:text-stone-500 " type='text'placeholder='password'onChange={e=>{setpassword(e.target.value)}}/>
           

           </div>
           <div className='grid grid-cols-2 my-2'>
            <h2 className='text-lg'>Login</h2>
            <h2 className='text-lg'>Forgot password</h2>
           
           

           </div>
           <div className='grid grid-cols-1'>
           <button type="button" className="btn border-stone-900 my-2 text-lg text-stone-900 hover:bg-stone-900
           hover:text-stone-500"onClick={checkUser}>Login</button>
           
<h1 className='text-lg hover:text-stone-700'>Don't have an account? <Link to="/sign" >Create Account</Link></h1>
           </div>
        </div>
</div>
       
       
       
        

  
    
    
    </>
      
    
  )
}
