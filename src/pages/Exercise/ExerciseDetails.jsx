import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Select from '../../components/Select/Select';

import { addExercise, editExercise, getUsers } from '../../services';
import {
  ExerciseContainer,
  TextFieldWrapper,
  ExerciseForm,
  SelectWrapper,
  ButtonWrapper,
  DateWrapper,
} from './ExerciseDetails.styles';

const ExerciseDetails = ({ initialExercise }) => {
  const isEdit = !!initialExercise;
  const action = `${isEdit ? 'Edit' : 'Add'}`;

  const [exercise, setExercise] = useState(initialExercise || {});
  const { user, description, duration, date } = exercise;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const submit = async () => {
    if (isEdit) {
      await editExercise(exercise);
    } else {
      let newExercise;
      if (!exercise.date) newExercise = { ...exercise, date: new Date().toISOString().split('T')[0] };
      else newExercise = { ...exercise };
      await addExercise(newExercise);
    }
  };

  useEffect(() => {
    const fetchData = async () => await getUsers();
    if (isEdit) setUsers([initialExercise.user]);
    else fetchData().then(setUsers);
  }, []);

  return (
    <ExerciseContainer>
      <Typography variant='h4'>{`${action} Exercise`}</Typography>
      <ExerciseForm>
        <SelectWrapper>
          <Select
            selectedId={selectedUser}
            label='User'
            items={users}
            handleChange={(value) => {
              setSelectedUser(value);
              setExercise({
                ...exercise,
                userId: value,
              });
            }}
          />
        </SelectWrapper>
        <TextFieldWrapper
          required
          label='Description'
          defaultValue={description}
          onChange={({ target }) =>
            setExercise({ ...exercise, description: target.value })
          }
        />
        <TextFieldWrapper
          required
          type='number'
          label='Duration'
          defaultValue={duration}
          onChange={({ target }) =>
            setExercise({ ...exercise, duration: +target.value })
          }
        />
        <DateWrapper
          label='Date'
          value={date}
          onChange={(value) => setExercise({ ...exercise, date: value.toISOString().split('T')[0] })}
        />
        <ButtonWrapper direction='row'>
          <Button variant='contained' onClick={submit}>
            {action}
          </Button>
        </ButtonWrapper>
      </ExerciseForm>
    </ExerciseContainer>
  );
};

export default ExerciseDetails;
