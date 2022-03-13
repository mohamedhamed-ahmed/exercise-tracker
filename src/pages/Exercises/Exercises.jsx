import React, { useEffect, useState, useMemo } from 'react';
import { Table } from '../../components/Table';
import { getExercises } from '../../services';
import { buildColumnsConfig } from './columns.config';
import { deleteExercise } from '../../services';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

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

  const onEditExercise = async (exercise) => {
    // await deleteExercise(exerciseId, userId);
    console.log(exercise);
  };

  const columns = buildColumnsConfig(onDeleteExercise, onEditExercise);

  return (
    <div>
      <Table rows={exercises} columns={columns} />
    </div>
  );
};

export default Exercises;
