import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { addUser } from '../../services';
import {
  AddUserContainer,
  UserName,
  UserNameForm,
  ButtonWrapper,
} from './AddUser.styles';

const AddUser = () => {
  const [userName, setUserName] = useState('');

  const submit = async () => {
    await addUser(userName);
  };

  return (
    <AddUserContainer>
      <Typography variant='h4'>Add new user </Typography>
      <UserNameForm>
        <UserName
          required
          label='Name'
          defaultValue={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <ButtonWrapper direction='row'>
          <Button
            variant='contained'
            disabled={!userName || userName.length < 2}
            onClick={submit}
          >
            Add
          </Button>
        </ButtonWrapper>
      </UserNameForm>
    </AddUserContainer>
  );
};

export default AddUser;
