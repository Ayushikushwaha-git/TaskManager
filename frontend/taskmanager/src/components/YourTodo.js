import React, { useState } from 'react'

import Navbar from './Navbar'
import { useEffect} from 'react';
import { useCart, useDispatchCart } from '../redux/context';

export default function YourTodo() {
   const[order,setOrder]=useState([]);
    const [products,setProducts]=useState([]);
    const [name,setName]=useState('');
   
    let data=useCart();
  let dispatch=useDispatchCart();
  useEffect(() => {
    const fetchTodos = async () => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            try {
                const response = await fetch(`http://localhost:8000/getData`);
               
                const result = await response.json();
                console.log(result)
                if(result.status === 'ok'){
                
                  const userCartItems = result.data.find(item => item.email === email);
                 
                setProducts(userCartItems.order_data);
               setOrder(userCartItems);
                userCartItems.order_data.forEach(todo => {
                        dispatch({ type: "ADD", id: todo.id, name: todo.name });
                    });
                } else {
                    console.error(result.message);
                }
                console.log(products)  
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        }
    };

    fetchTodos();
}, [dispatch]);



   const handleSubmit=(e)=>{

    e.preventDefault(); 
    let mail=localStorage.getItem("userEmail")
    const work = { _id: new Date().toISOString(), name };
  
    
            dispatch({type:"ADD",id:work._id,name:work.name}) 
            setProducts([...products,{id:work._id,name:work.name}]);
            
          if (localStorage.getItem("userEmail")) {
            fetch('http://localhost:8000/orderData', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                order_data: [{id:work._id,name:work.name}],
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
    const deleteUser=(orderId,productId)=>{
      fetch('http://localhost:8000/deleteData', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderid:orderId,
            proId:productId,
          
          })
          
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Handle the response if needed
        
            console.log('Server response:', response);
            
          })
          .then(() => {
            // Update the state after successful deletion
            //getAllData();
            console.log(orderId)
          
            
            setProducts(prevProducts => {
              return prevProducts.filter(todo => todo._id !== productId);
            });
             
           
          })
          .catch(error => {
            console.error('Error sending data to the server:', error);
          });
         
    }
    
  return (
   

    <div className="min-h-screen bg-gray-100">
        <Navbar/>
			<div className='flex justify-center items-center my-16 '>
                <div className='bg-white p-8 py-8 rounded-lg shadow-md w-full max-w-md'>
				<form className='flex flex-col space-y-4'onSubmit={handleSubmit} >
					<input
                    
						type='text'
						name='task'
            className="p-2 border border-gray-300 rounded-lg"

						placeholder='add your task'
                        onChange={(e) => {
                            
                           setName(e.target.value)
                        }}
						value={name}
					/>
					<button type="submit"  className="p-2 bg-stone-500 text-white rounded-lg hover:bg-stone-900 transition duration-300">Add Task</button>

				</form>
                </div>
			</div>
      <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Your Todos:</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
        <tr>
              <th className="py-2 px-10 bg-gray-200 text-left">Task</th>
              <th className="py-2 bg-gray-200 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
          {products.map(todo => (
              <tr key={todo.id} className="border-t">
                <td className="py-2 px-4">{todo.name}</td>
                <td className="py-2 px-4 text-center ">
               
                  <button  className="px-4 py-1 bg-stone-500 text-white rounded-lg hover:bg-stone-900 transition duration-300 " type="submit"onClick={() => {
                          const orderId = order._id; // Assuming _id is the orderId in your products data
                       
        const productId = todo.id;
       
                                  deleteUser(orderId,productId);
                                 
                          //dispatch({ type: "REMOVE" });
                        }}>delete</button></td>
                
              </tr>
             
          ))}
          </tbody>
         
     </table>
  </div>
		</div>
     
  )
}
