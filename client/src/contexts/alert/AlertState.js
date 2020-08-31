import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { 
  ADD_ALERT,
  REMOVE_ALERT
} from '../types';

const AlertState = props => {
  const initState = [];
  const [ state, dispatch ] = useReducer( alertReducer, initState ); 
  const addAlert = msg => {
    const alertObj = { id: v4(), msg };
    dispatch( { type: ADD_ALERT, payload: alertObj } );
    setTimeout(()=>dispatch({type: REMOVE_ALERT, payload: alertObj.id}), 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        addAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
