import { httpService } from '../utils';

const getUsers = async () => {
  const url = `http://localhost:5222/api/users`;
  const { data } = await httpService.get(url);
  return data;
};

const getUserById = async (userId) => {
  const url = `http://localhost:5222/api/users/${userId}`;
  const { data } = await httpService.get(url);
  return data;
};

const addUser = async (name) => {
  const url = `http://localhost:5222/api/users`;
  const { data } = await httpService.post(url, { name });
  return data;
};

export { addUser, getUsers, getUserById };
