import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import YourTodo from "./YourTodo";

export default function Sign() {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
 
  
  const navigate =useNavigate();
async function  createAcc(e){
 
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8000/sign", {
      email: email,
        password: password,
       },{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
     
    });
   
     
    if(response.data){
        navigate('/products')
   
  }
   
    
   
  } catch (err) {
    console.log(err);
  }


}
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-stone-900 ">
        <div className="bg-stone-500 rounded-lg p-8 w-96">
          <div className="grid grid-cols-1">
            <h2 className="my-3 font-bold text-2xl text-stone-900">Create Account</h2>
            <input
              className="my-2 p-2 rounded-md bg-stone-900 text-white placeholder:text-stone-500"
              type="text"
              placeholder="user/ email address"
              value={email}
              onChange={e=>{setemail(e.target.value)}}
            />
            <input
              className="my-2 p-2 rounded-md bg-stone-900 text-white placeholder:text-stone-500"
              type="text"
              placeholder="password"
              value={password}
              onChange={e=>{setpassword(e.target.value)}}
            />
          </div>

          
       
          <div className="grid grid-cols-1">
            <button
              type="button"
              className="btn  my-2 text-lg  text-stone-900 hover:bg-stone-900
              hover:text-stone-500 border-stone-900"
              onClick={createAcc}
            >
             Sign
            </button>
          
            <h1 className="text-lg text-stone-900 hover:text-stone-900">
              Have an account? <Link to="/login"> Login</Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
