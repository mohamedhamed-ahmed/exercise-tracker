import { PrismaClient } from '@prisma/client';
const { exercise } = new PrismaClient();

const getAllExercises = async () =>
  await exercise.findMany({
    select: {
      id: true,
      description: true,
      duration: true,
      date: true,
      user: true,
    }
  });

const getUserExercises = async (userId) =>
  await exercise.findMany({
    where: {
      user_id: parseInt(userId),
    },
    select: {
      id: true,
      description: true,
      duration: true,
      date: true,
    },
  });

const createExercise = async (userId, description, date, duration) =>
  await exercise.create({
    data: {
      user_id: parseInt(userId),
      description,
      date: new Date(date),
      duration,
    },
  });

const getUserExerciseById = async (userId, exerciseId) =>
  await exercise.findFirst({
    where: {
      id: parseInt(exerciseId),
      user_id: parseInt(userId),
    },
  });

const deleteExercise = async (userId, exerciseId) =>
  await exercise.deleteMany({
    where: {
      id: parseInt(exerciseId),
      user_id: parseInt(userId),
    },
  });

const editExerciseById = async (exerciseId, description, date, duration) =>
  await exercise.update({
    where: {
      id: parseInt(exerciseId),
    },
    data: {
      description,
      date,
      duration,
    },
  });

export {
  getAllExercises,
  getUserExercises,
  getUserExerciseById,
  editExerciseById,
  createExercise,
  deleteExercise,
};
