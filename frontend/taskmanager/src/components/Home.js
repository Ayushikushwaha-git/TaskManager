import React from 'react'
import Navbar from './Navbar'
//<img className=" opacity-88 min-w-full min-h-full object-cover filter brightness-100"src={img></img></img>

import {Link} from 'react-router-dom';
export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center h-screen bg-stone-500 ">
     <div className=' relative bg-teal-500'>
      
      <div className='absolute  inset-0 flex items-center justify-center bg-teal-500 '>
        <div className='text-center text-white'>
        <h1 className="text-4xl  md:text-7xl xl:text-8x w-full ">Task Manager</h1>
         <p className='text-lg md:text-3xl xl:text-4xl w-96'>We here to find right flatmates for you</p>
        
        </div>
        
      </div>
     
     </div>
    
  </div>
    </>
  )
}
