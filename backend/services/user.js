import { PrismaClient } from '@prisma/client';

const { user } = new PrismaClient();

const getUsers = async () => await user.findMany();

const getUserById = async (id) =>
  await getSpecificUser({
    id: parseInt(id),
  });

const getUserByName = async (name) =>
  await getSpecificUser({
    name,
  });

const getSpecificUser = async (condition) =>
  await user.findUnique({
    where: condition,
  });

const addUser = async (name) =>
  await user.create({
    data: {
      name,
    },
  });

export { getUsers, getUserById, getUserByName, addUser };
