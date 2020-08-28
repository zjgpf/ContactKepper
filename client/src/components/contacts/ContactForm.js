import React, { useState, useContext, useEffect, Fragment } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactForm = () => {
  const  contactContext = useContext(ContactContext);
  const [ contact, setContact ] = useState(
    {
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    }
  ); 
  const { name, email, phone, type } = contact;
  const onChange = e=> setContact({ ...contact, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    if ( contactContext.current ) contactContext.updateContact(contact);
    else contactContext.addContact(contact);
    contactContext.clearCurrent();
  };
  useEffect(() => {
    if (contactContext.current != null) setContact(contactContext.current);
    else setContact({name:'',email:'',phone:'',type:'personal'});
  }, [contactContext, contactContext.current]);
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <h2 className='text-2xl text-blue-900 text-center my-2'>{contactContext.current === null ? 'Add Contact' : 'Edit Contact'}</h2>
        <input value={name} name='name' onChange={onChange} type='text' placeholder='Name' className='px-2 py-1 my-2 block border w-full rounded' />
        <input value={email} name='email' onChange={onChange} type='email' placeholder='Email' className='px-2 py-1 my-2 block border w-full rounded' />
        <input value={phone} name='phone' onChange={onChange} type='text' placeholder='phone' className='px-2 py-1 my-2 block border w-full rounded' />
        <h3 className='mt-2 mb-1'>Contact Type:</h3>
        <input name='type' onChange={onChange} type='radio' value='personal' checked={type==='personal'} />&nbsp;&nbsp;Personal&nbsp;&nbsp;&nbsp;
        <input name='type' onChange={onChange} type='radio' value='professional' checked={type==='professional'} />&nbsp;&nbsp;Professional
        <input type='submit' value={ contactContext.current === null ? 'Add Contact' : 'Update Contact'} className='py-1 block bg-blue-900 text-blue-100 w-full my-4 rounded' />
      </form>
        { contactContext.current && (<button onClick={contactContext.clearCurrent} className='py-1 block bg-gray-300 text-gray-900 w-full my-4 rounded'>Clear</button>) }
    </Fragment>
  );
};

export default ContactForm;
