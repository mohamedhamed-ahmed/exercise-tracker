import express from 'express';
import { interceptor } from '../helpers';
import { userValidationRules, validate } from '../validations';
import { getUsers, getUserById, getUserByName, addUser } from '../services';

const router = express.Router();

router.get(
  '/',
  interceptor(async (req, res) => {
    const result = await getUsers();

    res.status(200).json(result);
  })
);

router.get(
  '/:id',
  interceptor(async (req, res) => {
    const { id } = req.params;
    const result = await getUserById(id);

    res.status(200).send(result);
  })
);

router.post(
  '/',
  userValidationRules(),
  validate,
  interceptor(async (req, res) => {
    const { name } = req.body;

    const userExists = await getUserByName(name);

    if (userExists) {
      return res.status(400).json({
        msg: 'user already exists',
      });
    }

    let newUser = await addUser(name);

    res.status(201).json(newUser);
  })
);

export { router as userRouter };
