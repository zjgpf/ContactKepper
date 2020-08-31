import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext';
import ContactContext from '../../contexts/contact/contactContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;
  const onLogout = () => {
    logout();
  };
  const authLinks = (
    <Fragment> 
      <li className='px-2'>Hello, { user && user.name } </li>
      <li className='px-2'>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'/>{' '}
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className='px-2'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='px-2'>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='flex justify-between py-2 px-4 bg-blue-700 text-blue-100'>
      <h1 className='text-2xl'>
        <Link to='/'><i className='fas fa-id-card-alt'/> Contact Keeper</Link> 
      </h1>
      <ul className='flex items-center'>
        { isAuthenticated ? authLinks : guestLinks }
      </ul>
    </div>
  );
};

export default Navbar;
