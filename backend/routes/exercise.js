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
    const { user_id } = req.params;
    
    const exercises = user_id ? await getUserExercises(user_id) :await getAllExercises(user_id);

    res.status(200).send(exercises);
  })
);

router.post(
  '/',
  exerciseValidationRules(),
  validate,
  interceptor(async (req, res) => {
    const { user_id, description, date, duration } = req.body;
    let userExists = await getUserById(user_id);

    if (!userExists) {
      return res.status(404).json({
        msg: 'user not found',
      });
    }

    let newExercise = await createExercise(
      user_id,
      description,
      date,
      duration
    );

    res.status(201).json(newExercise);
  })
);

router.delete(
  '/:exercise_id',
  interceptor(async (req, res) => {
    const { exercise_id, user_id } = req.params;
    const exerciseExists = await getUserExerciseById(user_id, exercise_id);

    if (!exerciseExists) {
      return res.status(404).json({
        msg: 'exercise not found',
      });
    }

    const deletedExercise = await deleteExercise(user_id, exercise_id);

    res.status(200).json(deletedExercise);
  })
);

router.put(
  '/:exercise_id',
  interceptor(async (req, res) => {
    const { exercise_id, user_id } = req.params;
    const { description, date, duration } = req.body;
    const exerciseExists = await getUserExerciseById(user_id, exercise_id);

    if (!exerciseExists) {
      return res.status(404).json({
        msg: 'exercise not found',
      });
    }

    const updatedExercise = await editExerciseById(
      exercise_id,
      description,
      date,
      duration
    );

    res.status(200).json(updatedExercise);
  })
);

export { router as exerciseRouter };
