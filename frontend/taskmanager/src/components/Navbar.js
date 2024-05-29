
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../index.css';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div className="bg-stone-900  md:p-6 md:h-16 h-8 fixed top-0 w-full z-10"> 
    <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <Link to="/login"><h1 className="sm:float-right sm:-mt-3 sm:mr-5 hidden md:block text-stone-500">Login</h1></Link>
        <Link to="/sign"><h1 className="sm:float-right sm:-mt-3 sm:mr-5 hidden md:block text-stone-500">Sign</h1></Link>
    </div>
    {isOpen && (
        <div className="md:hidden bg-stone-500 p-4">
          <ul>
            <li>
              <Link to="/sign">Sign</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
