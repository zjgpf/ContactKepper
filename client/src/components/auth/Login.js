import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';

const Login = props => {
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  }); 
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  useEffect(()=>{
    if (authContext.error === 'Invalid Credentials') {
      alertContext.addAlert(authContext.error); 
      authContext.clearError();
    }
    if (authContext.isAuthenticated) {
      props.history.push('/');
    } 
  },[authContext.error, authContext.isAuthenticated, props.history]);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    authContext.login(user);
  };
  return (
    <form onSubmit={onSubmit} className='w-full p-4 lg:w-1/3 md:w-1/2 m-auto'>
      <h1 className='text-center text-4xl'>Account <span className='text-blue-900'>Login</span></h1> 
      <div className='py-2'>
        <label htmlFor='email' className='py-2 block'>Email</label>
        <input required onChange={onChange} id='email' name='email' type='email' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <label htmlFor='password' className='py-2 block'>Password</label>
        <input required onChange={onChange} id='password' name='password' type='text' className='py-1 px-2 rounded border block w-full'/>
      </div>
      <div className='py-2'>
        <input type='submit' value='Login' className='py-1 px-2 rounded block text-blue-100 bg-blue-900 w-full cursor-pointer'/>
      </div>
    </form>
  );
};

export default Login;
