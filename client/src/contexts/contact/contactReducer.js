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

export default (state, action) => {
  switch(action.type) {
    case GET_CONTACTS: return { ...state, contacts: action.payload, loading: false };
    case ADD_CONTACT: return {...state, contacts: [ ...state.contacts, action.payload ], loading: false };
    case DELETE_CONTACT: return {
      ...state,
      contacts: state.contacts.filter( contact => contact.id !== action.payload ),
      loading: false
    };
    case DELETE_FILTER: return {
      ...state,
      filtered: state.filtered.filter( contact => contact.id !== action.payload ),
      loading: false
    };
    case SET_CURRENT: return {
      ...state,
      current: action.payload,
      loading: false
    };
    case CLEAR_CURRENT: return {
      ...state,
      current: null,
      loading: false
    };
    case UPDATE_CONTACT: return {
      ...state,
      contacts: state.contacts.map( contact => contact.id === action.payload.id ? action.payload : contact )
    }
    case FILTER_CONTACTS: return {
      ...state,
      filtered: state.contacts.filter(
        contact => {
          const pattern = RegExp(action.payload, 'gi');
          return pattern.test(contact.name) || pattern.test(contact.email);
        }
      )
    }
    case CLEAR_FILTER: return {
      ...state,
      filtered: null
    }
    default: return {...state};
  };
};
