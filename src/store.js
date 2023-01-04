import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const ADD_USER = 'ADD_USER';

const loadUsers = (data) => {
  return { type: LOAD_USERS, payload: data };
};

const appendUser = (user) => {
  return { type: ADD_USER, payload: user };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/users');
      dispatch(loadUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/users', user);
      dispatch(appendUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const reducer = (state = {}, action) => {
  if (action.type === LOAD_USERS) return { ...state, users: action.payload };
  if (action.type === ADD_USER)
    return { ...state, users: [...state.users, action.payload] };
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk, createLogger()));

export default store;
