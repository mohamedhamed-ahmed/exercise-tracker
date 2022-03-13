import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Select from '../../components/Select/Select';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  addExercise,
  editExercise,
  getUsers,
  getExerciseById,
} from '../../services';
import {
  ExerciseContainer,
  TextFieldWrapper,
  ExerciseForm,
  SelectWrapper,
  ButtonWrapper,
  DateWrapper,
} from './ExerciseDetails.styles';

const ExerciseDetails = () => {
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get('userid');
  const exerciseId = new URLSearchParams(search).get('id');
  const isEdit = !!exerciseId;
  const action = `${isEdit ? 'Edit' : 'Add'}`;
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const submit = async () => {
    isEdit ? await editExercise(exercise) : await addExercise(exercise);
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        const result = await getExerciseById(exerciseId, userId);
        setExercise({
          ...result,
          userId: result.user.id,
        });
        setUsers([result.user]);
        setSelectedUser(result?.user?.id);
      } else {
        const result = await getUsers();
        setUsers(result);
      }
    };
    fetchData();
  }, []);

  const { description, duration, date } = exercise;

  return (
    <ExerciseContainer>
      <Typography variant='h4'>{`${action} Exercise`}</Typography>
      <ExerciseForm>
        {!isEdit && (
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
        )}
        <TextFieldWrapper
          required
          label='Description'
          value={description}
          onChange={({ target }) =>
            setExercise({ ...exercise, description: target.value })
          }
        />
        <TextFieldWrapper
          required
          type='number'
          label='Duration'
          value={duration}
          onChange={({ target }) =>
            setExercise({ ...exercise, duration: +target.value })
          }
        />
        <DateWrapper
          label='Date'
          value={date}
          onChange={(value) =>
            setExercise({
              ...exercise,
              date: value.toISOString().split('T')[0],
            })
          }
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
