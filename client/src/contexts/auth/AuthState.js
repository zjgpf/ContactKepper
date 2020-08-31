import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  const register = async formData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    const _res = await fetch('/api/users', config);
    const res = await _res.json();
    if (res.token) {
      dispatch({type: REGISTER_SUCCESS, payload: res.token});
      loadUser();
    }
    else {
      dispatch({type: REGISTER_FAIL, payload: res.msg});
    }
  };
  
  const loadUser = async () => {
    const config = {
      headers: {'x-auth-token': localStorage.token}
    };
    const _res = await fetch('/api/auth',config); 
    const res = await _res.json();
    if ( res._id ) {
      dispatch({type: USER_LOADED, payload: res});
    }
    else {
      dispatch({type: AUTH_ERROR});
    }
  };

  const login = async formData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    const _res = await fetch('/api/auth', config);
    const res = await _res.json();
    if (res.token) {
      dispatch({type: LOGIN_SUCCESS, payload: res.token});
      loadUser();
    }
    else {
      dispatch({type: LOGIN_FAIL, payload: res.msg});
    }
  };

  const clearError = () => dispatch({type: CLEAR_ERRORS});

  const logout = () => dispatch({type: LOGOUT});

  return  (
            <AuthContext.Provider
              value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                clearError,
                logout
              }}
            >
              { props.children } 
            </AuthContext.Provider>
          )
};

export default AuthState;
