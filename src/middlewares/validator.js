import validates from 'express-validator'

export const validateUSR = async (req, res, next) => {
  await validates.body('fullname').notEmpty().isString().isLength({ min: 3 }).withMessage('Invalid fullname').run(req)
  await validates.body('password').trim().notEmpty().isLength({ min: 8, max: 20 }).withMessage('Invalid password').run(req)
  await validates.body('username').trim().isEmail().notEmpty().isLength({ min: 5 }).withMessage('Invalid username').run(req)

  const result = validates.validationResult(req).array()
  if (!result.length) {
    return next()
  }
  return next({
    status: 498,
    code: 2001,
    message: result,
    userMessage: `Invalid fields`
  })
}
