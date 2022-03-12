import { PrismaClient } from '@prisma/client';
const { exercise } = new PrismaClient();

const getUserExercises = async (user_id) =>
  await exercise.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      id: true,
      description: true,
      duration: true,
      date: true,
    },
  });

const createExercise = async (user_id, description, date, duration) =>
  await exercise.create({
    data: {
      user_id,
      description,
      date: new Date(date),
      duration,
    },
  });

const getUserExerciseById = async (user_id, exercise_id) =>
  await exercise.findFirst({
    where: {
      id: parseInt(exercise_id),
      user_id: parseInt(user_id),
    },
  });

const deleteExercise = async (user_id, exercise_id) =>
  await exercise.deleteMany({
    where: {
      id: parseInt(exercise_id),
      user_id: parseInt(user_id),
    },
  });

const editExerciseById = async (exercise_id, description, date, duration) =>
  await exercise.update({
    where: {
      id: parseInt(exercise_id),
    },
    data:{
      description,
      date,
      duration
    }
  });

export {
  getUserExercises,
  getUserExerciseById,
  editExerciseById,
  createExercise,
  deleteExercise,
};
