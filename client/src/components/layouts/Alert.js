import React, { useContext } from 'react';
import AlertContext from '../../contexts/alert/alertContext';

const Alert = () => {
  const alertContexts = useContext(AlertContext);
  const { alerts } = alertContexts;
  return (
    alerts.length > 0 && alerts.map(
      alertItem => (
        <div key={alertItem.id} className='my-2 p-4 bg-red-600 text-center text-red-100 opacity-75'>
          <i className='fas fa-info-circle' />&nbsp;{alertItem.msg}
        </div>
      ) 
    )
  );
};

export default Alert;
