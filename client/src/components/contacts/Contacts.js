import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../contexts/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext; 
  if ( filtered !== null ) return (
    <Fragment> 
      {
        filtered.map(
          contact => <ContactItem key={contact.id} contact={contact} />
        )
      }
    </Fragment>
  );
  return (
    <Fragment> 
      {
        contacts.map(
          contact => <ContactItem key={contact.id} contact={contact} />
        )
      }
    </Fragment>
  );
};

export default Contacts;
