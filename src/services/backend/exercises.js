import { httpService } from '../utils';

const getExerciseById = async (exerciseId, userId) => {
  const url = `http://localhost:5222/api/users/${userId}/exercises/${exerciseId}`;
  const { data } = await httpService.get(url);
  return data;
};

const getExercises = async () => {
  const url = `http://localhost:5222/api/exercises`;
  const { data } = await httpService.get(url);
  return data;
};

const deleteExercise = async (exerciseId, userId) => {
  const url = `http://localhost:5222/api/users/${userId}/exercises/${exerciseId}`;
  const { data } = await httpService.delete(url);
  return data;
};

const addExercise = async ({ userId, description, duration, date }) => {
  const url = `http://localhost:5222/api/users/${userId}/exercises`;
  const { data } = await httpService.post(url, { description, duration, date });
  return data;
};

const editExercise = async ({
  userId,
  id,
  description,
  duration,
  date,
}) => {
  const url = `http://localhost:5222/api/users/${userId}/exercises/${id}`;
  const { data } = await httpService.put(url, { description, duration, date });
  return data;
};

export { getExercises, deleteExercise, addExercise, editExercise, getExerciseById };
