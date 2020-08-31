import React, { useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactItem = ({contact: {_id, name, email, phone, type}}) => {
  const contactContext = useContext(ContactContext);
  const onDelete = () => {
    contactContext.deleteContact(_id); 
    contactContext.clearCurrent();
    if (contactContext.filtered) {
      contactContext.deleteFilter(_id);
    }
  };
  return (
          <div className='my-2 py-2 px-4 bg-gray-200 rounded'>
            <div className='flex justify-between'> 
              <h3 className='text-xl text-blue-800'>{name}</h3>
              <div className={`px-2 py-1 ${ type === 'personal'? 'bg-blue-800' : 'bg-green-600'} text-blue-100 rounded`}>{type[0].toUpperCase()+type.slice(1)}</div>
            </div>
            <div className='py-2'>
              <i className='fas fa-envelope-open'/> {email}
            </div>
            <div className='py-2'>
              <i className='fas fa-phone'/> {phone}
            </div>
            <div>
              <button onClick={ () => contactContext.setCurrent({_id, name, email, phone, type}) } className='bg-black mr-2 px-4 py-2 text-white rounded'>Edit</button> 
              <button onClick={onDelete} className='bg-red-800 m-2 px-4 py-2 text-red-100 rounded'>Delete</button> 
            </div>
          </div>
        );
  }

export default ContactItem;
