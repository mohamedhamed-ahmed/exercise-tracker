import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { ButtonWrapper } from './columns.config.styles';
import { getExercises } from '../../services';
import { buildColumnsConfig } from './columns.config';
import { deleteExercise } from '../../services';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => await getExercises();
    fetchData()
      .then(setExercises)
      .catch((e) => console.log(e));
  }, []);

  const onDeleteExercise = async (exerciseId, userId) => {
    await deleteExercise(exerciseId, userId);
    const newExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId
    );
    setExercises(newExercises);
  };

  const onEditExercise = async ({user,id}) => {
    navigate({
      pathname: '/exercise-details',
      search: `?id=${id}&userid=${user.id}`,
    });
  };

  const columns = buildColumnsConfig(onDeleteExercise, onEditExercise);

  return (
    <div>
      <ButtonWrapper direction='row' spacing={2}>
        <Button variant='contained' onClick={() => navigate('/add-user')}>
          Add User
        </Button>
        <Button
          variant='contained'
          onClick={() => navigate('/exercise-details')}
        >
          Add Exercise
        </Button>
      </ButtonWrapper>
      <Table rows={exercises} columns={columns} />
    </div>
  );
};

export default Exercises;
