import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser } from './store';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleOnChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    dispatch(addUser({ firstName, lastName }));
    setFirstName('');
    setLastName('');
  };

  return (
    <>
      <h1>Users</h1>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      ) : (
        '...loading'
      )}
      Add User
      <form onSubmit={(event) => handleAddUser(event)}>
        <input
          value={firstName}
          placeholder='first name'
          onChange={(event) => handleOnChange(event, setFirstName)}
        ></input>
        <input
          value={lastName}
          placeholder='last name'
          onChange={(event) => handleOnChange(event, setLastName)}
        ></input>
        <button onClick={(event) => handleAddUser(event)}>submit</button>
      </form>
    </>
  );
};

export default Users;
