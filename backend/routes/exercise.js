import express from 'express';
import { interceptor } from '../helpers';
import { exerciseValidationRules, validate } from '../validations';
import {
  getAllExercises,
  getUserById,
  getUserExercises,
  getUserExerciseById,
  createExercise,
  deleteExercise,
  editExerciseById,
} from '../services';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  interceptor(async (req, res) => {
    const { userId } = req.params;
    
    const exercises = userId ? await getUserExercises(userId) :await getAllExercises(userId);

    res.status(200).send(exercises);
  })
);

router.post(
  '/',
  exerciseValidationRules(),
  validate,
  interceptor(async (req, res) => {
    const { userId, description, date, duration } = req.body;
    let userExists = await getUserById(userId);

    if (!userExists) {
      return res.status(404).json({
        msg: 'user not found',
      });
    }

    let newExercise = await createExercise(
      userId,
      description,
      date,
      duration
    );

    res.status(201).json(newExercise);
  })
);

router.delete(
  '/:exerciseId',
  interceptor(async (req, res) => {
    const { exerciseId, userId } = req.params;
    const exerciseExists = await getUserExerciseById(userId, exerciseId);

    if (!exerciseExists) {
      return res.status(404).json({
        msg: 'exercise not found',
      });
    }

    const deletedExercise = await deleteExercise(userId, exerciseId);

    res.status(200).json(deletedExercise);
  })
);

router.put(
  '/:exerciseId',
  interceptor(async (req, res) => {
    const { exerciseId, userId } = req.params;
    const { description, date, duration } = req.body;
    const exerciseExists = await getUserExerciseById(userId, exerciseId);

    if (!exerciseExists) {
      return res.status(404).json({
        msg: 'exercise not found',
      });
    }

    const updatedExercise = await editExerciseById(
      exerciseId,
      description,
      date,
      duration
    );

    res.status(200).json(updatedExercise);
  })
);

export { router as exerciseRouter };
