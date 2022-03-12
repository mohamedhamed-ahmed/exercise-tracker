import { body } from 'express-validator';
const exerciseValidationRules = () => [
  body('user_id').isNumeric().withMessage('Required and must be a number'),
  body('description').isString().withMessage('Required and must be a string'),
  body('duration').isNumeric().withMessage('Required and must be a number'),
  body('date').isDate().isAfter(new Date().toDateString()).withMessage('Required and must be a date time in the future'),
];

export { exerciseValidationRules };
