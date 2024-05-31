import React from 'react'
import Navbar from './Navbar'
//<img className=" opacity-88 min-w-full min-h-full object-cover filter brightness-100"src={img></img></img>

import {Link} from 'react-router-dom';
export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center h-screen bg-stone-500 ">
     <div className=' relative bg-white-500 w-full h-full flex justify-center items-center'>
      
      <div className='absolute  inset-0 flex items-center justify-center bg-opacity-75 bg-white '>
        <div className='text-center text-stone p-6 rounded-lg shadow-lg'>
        <h1 className="text-4xl md:text-7xl xl:text-8xl font-bold mb-4 transition transform hover:scale-105">Task Manager</h1>
         <p className='text-lg md:text-3xl xl:text-4xl w-full md:w-96 mx-auto mb-8'>We are here to help you manage your tasks efficiently.</p>
         <Link to="/your-todo">
                <button className="px-6 py-3 bg-stone-700 hover:bg-stone-900 text-white rounded-lg text-xl transition duration-300">
                  Get Started
                </button>
              </Link>

        
        </div>
        
      </div>
     
     </div>
    
  </div>
    </>
  )
}
