import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between py-2 px-4 bg-blue-700 text-blue-100'>
      <h1 className='text-2xl'>
        <Link to='#'><i className='fas fa-id-card-alt'/> Contact Keeper</Link> 
      </h1>
      <ul className='flex items-center'>
        <li className='px-2'><Link to='/'>Home</Link></li>
        <li className='px-2'><Link to='/about'>About</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
