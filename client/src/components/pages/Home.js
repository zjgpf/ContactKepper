import React, { useEffect, useContext } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../contexts/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(()=>{
    if (authContext.token !==''){
      authContext.loadUser()
    }
  },[]);
  return (
    <div className='my-4 p-4'>
      <div className='grid grid-cols-2'>
        <div className='ml-16'>
          <ContactForm />
        </div>
        <div className='mx-16'>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
