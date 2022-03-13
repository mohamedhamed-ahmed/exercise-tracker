import { httpService } from '../utils';

const getExercises = async () => {
  const url = `http://localhost:5222/api/exercises`;
  const { data } = await httpService.get(url);
  console.log(JSON.stringify(data));
  return data;
};

export { getExercises };
