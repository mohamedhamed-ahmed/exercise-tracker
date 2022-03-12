import { body } from 'express-validator';

const userValidationRules = () => [
  body('name')
  .isString()
  .withMessage('Required and must be a valid string')];

export { userValidationRules };
