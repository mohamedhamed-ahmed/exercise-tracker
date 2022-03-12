import express from 'express';
import { use } from '../helpers';
import { exerciseValidationRules, validate } from '../validations';
import {
  getUserById,
  getUserExercises,
  getUserExerciseById,
  createExercise,
  deleteExercise,
} from '../services';

const router = express.Router({ mergeParams: true });

router.get('/', use(async (req, res) => {
  const { user_id } = req.params;
  const exercises = getUserExercises(user_id);

  res.send(exercises);
}));

router.post('/', exerciseValidationRules(), validate, use(async (req, res) => {
  const { user_id, description, date, duration } = req.body;
  let userExists = await getUserById(user_id);

  if (!userExists) {
    return res.status(400).json({
      msg: 'user not found',
    });
  }

  let newExercise = await createExercise(user_id, description, date, duration);

  res.json(newExercise);
}));

router.delete('/:exercise_id', use(async (req, res) => {
  const { exercise_id, user_id } = req.params;
  const exerciseExists = await getUserExerciseById(user_id, exercise_id);

  if (!exerciseExists) {
    return res.status(400).json({
      msg: 'exercise not found',
    });
  }

  const deletedExercise = await deleteExercise(user_id, exercise_id);

  res.json(deletedExercise);
}));

export { router as exerciseRouter };
