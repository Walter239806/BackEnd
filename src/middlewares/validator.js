import { check, oneOf } from 'express-validator'

export const vUSRCreate = [
  check('username').exists().isEmail().notEmpty().withMessage('Requerido'),
  check('fullname').exists().isString().isLength({ min: 3 }).withMessage('Requerido'),
  check('password').exists().isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }).withMessage('Requerido')
]

export const vUSRUpdate = [
  check('username').exists().isEmail().notEmpty().withMessage('Requerido'),
  oneOf(
    check('fullname').exists().isString().isLength({ min: 3 }).withMessage('Requerido'),
    check('password').exists().isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }).withMessage('Requerido')
  )
]

export const vUSRDelete = [check('username').notEmpty().withMessage('Requerido')]

export const vChangePass = [
  check('username').exists().isEmail().notEmpty().withMessage('Requerido'),
  check('confirmP').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }).withMessage('Requerido'),
  check('newP').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }).withMessage('Requerido')
]

export const vLogin = [
  check('username').exists().isEmail().notEmpty().withMessage('Requerido'),
  check('password').notEmpty().withMessage('Requerido')
]
