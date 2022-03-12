import express from 'express';
import { use } from '../helpers';
import { userValidationRules, validate } from '../validations';
import { getUsers, getUserById, getUserByName, addUser } from '../services';

const router = express.Router();

router.get(
  '/',
  use(async (req, res) => {
    const result = await getUsers();
    
    res.json(result);
  })
);

router.get('/:user_id', use(async (req, res) => {
  const { user_id } = req.params;
  const result = await getUserById(user_id);

  res.send(result);
}));

router.post('/', userValidationRules(), validate, use(async (req, res) => {
  const { name } = req.body;

  const userExists = await getUserByName(name);

  if (userExists) {
    return res.status(400).json({
      msg: 'user already exists',
    });
  }

  let newUser = await addUser(name);

  res.json(newUser);
}));

export { router as userRouter };
