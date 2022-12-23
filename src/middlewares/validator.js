import express from 'express-validator'

const checkField = (req, res, next) => {
  const input = req.body
  const validates = input.password.isLenght({ min: 5 })

  if (!validates) {
    return next({
      status: 498,
      code: 2001,
      message: `TOKEN indefinido desde ${req.protocol}://${req.get('host')}${req.originalUrl}`,
      userMessage: `Token indefinido`
    })
  }

  next()
}
export default checkField
