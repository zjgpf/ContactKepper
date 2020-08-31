import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  DELETE_FILTER
} from '../types';

const ContactState = props => {
  //const contacts = [
  //  {id:'1', name:'name1', email:'email1@gmail.com', phone:'111-111-1111', type:'personal'},
  //  {id:'2', name:'name2', email:'email2@gmail.com', phone:'111-111-2222', type:'personal'},
  //  {id:'3', name:'name3', email:'email3@gmail.com', phone:'111-111-3333', type:'professional'},
  //];
  const current = null;
  const filtered = null;
  //const initState = {contacts, current, filtered};
  const initState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  const getContacts = async () => {
    const config = {
      headers: {'x-auth-token': localStorage.token}
    }; 
    const _res = await fetch('/api/contacts', config);
    const res = await _res.json();
    dispatch({type: GET_CONTACTS, payload: res});
  };
  const [ state, dispatch ] = useReducer(ContactReducer, initState);
  const addContact = async contact => {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.token
        },
        body: JSON.stringify(contact)
      };
      const _contactObj = await fetch('/api/contacts', config);
      const contactObj = await _contactObj.json();
      dispatch({type: ADD_CONTACT, payload: contactObj});
  };
  const deleteContact = async id => {
    const config = {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.token
      }
    };
    await fetch(`/api/contacts/${id}`, config);
    dispatch({type: DELETE_CONTACT, payload: id});
  };
  const setCurrent = current => dispatch({type: SET_CURRENT, payload: current});
  const clearCurrent = () => dispatch({type: CLEAR_CURRENT});

  const updateContact = async contact => { 
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      },
      body: JSON.stringify(contact)
    };
    const url = `/api/contacts/${contact._id}`;
    const _res = await fetch(url, config);
    const res = await _res.json();
    dispatch({type: UPDATE_CONTACT, payload: contact}) 
  };

  const filterContact = text => dispatch({type: FILTER_CONTACTS, payload: text});
  const clearFilter = () => dispatch({type: CLEAR_FILTER});
  const deleteFilter = id => {
    dispatch({type: DELETE_FILTER, payload: id});
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        deleteFilter,
        getContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}; 

export default ContactState;
