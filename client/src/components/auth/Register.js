import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../contexts/alert/alertContext';
import AuthContext from '../../contexts/auth/authContext';

const Register = props => {
  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  }); 
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  useEffect(()=>{
    if (authContext.isAuthenticated) {
      props.history.push('/');
    }
    if (authContext.error === 'User already exists') { 
      alertContext.addAlert(authContext.error); 
      authContext.clearError();
    }
  }, [authContext.error, authContext.isAuthenticated, props.history]);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    const { password, password2 } = user;
    if (password !== password2) alertContext.addAlert('Password not match');
    else {
      authContext.register( user );
    }
  };
  return (
    <form onSubmit={onSubmit} className='w-full p-4 lg:w-1/3 md:w-1/2 m-auto'>
      <h1 className='text-center text-4xl'>Account <span className='text-blue-900'>Register</span></h1> 
      <div className='py-2'>
        <label htmlFor='name' className='py-2 block'>Name</label>
        <input onChange={onChange} required id='name' name='name' type='text' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <label htmlFor='email' className='py-2 block'>Email</label>
        <input onChange={onChange} required id='email' name='email' type='email' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password' className='py-2 block'>Password</label>
        <input onChange={onChange} required minLength='6' id='password' name='password' type='text' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password2' className='py-2 block'>Confirm Password</label>
        <input onChange={onChange} required minLength='6' id='password2' name='password2' type='text' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <input type='submit' value='Register' className='py-1 px-2 rounded block text-blue-100 bg-blue-900 w-full cursor-pointer'/>
      </div>
    </form>
  );
};

export default Register;
