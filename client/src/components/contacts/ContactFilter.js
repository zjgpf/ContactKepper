import React, { Fragment, useContext, useRef } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const onChange = e => {
    const text = e.target.value.trim();
    if ( text !== '' ) contactContext.filterContact(text);
    else contactContext.clearFilter();
  };
  return (
    <Fragment>
      <input onChange={onChange} type='text' placeholder='Filter Contacts...' className='my-4 py-2 px-4 border rounded w-full' />
    </Fragment>
  );
};

export default ContactFilter;
