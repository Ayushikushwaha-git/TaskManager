import React, { useState } from 'react'

import Navbar from './Navbar'
import { useEffect} from 'react';
import { useCart, useDispatchCart } from '../redux/context';

export default function YourTodo() {
   
    
    const [name,setName]=useState('');
    let data=useCart();
  let dispatch=useDispatchCart();
   const handleSubmit=(e)=>{
    e.preventDefault(); 
    const work = { _id: new Date().toISOString(), name };
    console.log(work)
    if (localStorage.getItem("userEmail")){
        dispatch({ type: 'UPDATE', id: work._id });
       }
          else{
            dispatch({type:"ADD",id:work._id,name:work.name}) }
          if (localStorage.getItem("userEmail")) {
            fetch('http://localhost:8000/orderData', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                order_data: [...data, { id: work._id, name: work.name }],
                email: localStorage.getItem("userEmail"),
              })
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                // Handle the response if needed
                console.log(response)
                return response.json();
            
              })
              .catch(error => {
                console.error('Error sending data to the server:', error);
              });
    };}
    
  return (
   

    <div>
        <Navbar/>
			<div className='addtask flex justify-center items-center my-44 '>
                <div className='bg-white p-8 rounded-lg shadow-md'>
				<form className='flex flex-col space-y-4' >
					<input
                    
						type='text'
						name='task'
						placeholder='add your task'
                        onChange={(e) => {
                            
                           setName(e.target.value)
                        }}
						value={name}
					/>
					<button type="submit" onClick={() => handleSubmit} className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>Add Task</button>

				</form>
                </div>
			</div>
		</div>
  )
}
