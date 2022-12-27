import { check, oneOf } from 'express-validator'
import Model from '../model/post.js'

export const CREATE = async (req, res, next) => {
  try {
    const input = req.body
    console.log('input:', input)

    const newPost = new Model(input)
    const result = await newPost.save()

    console.log('result', result)

    res.send('ok')
  } catch (error) {
    return next({
      Code: 501,
      message: error.message
    })
  }
}

export const UPDATE = async (req, res, next) => {
  try {
    const input = req.body
    console.log('input:', input)

    const response = await Model.updateOne(
      {
        _id: input._id
      },

      { ...input }
    )

    console.log('result', response)

    res.send('ok')
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}

export const READALL = async (req, res, next) => {
  try {
    const find = await Model.find()
    return res.send(find)
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}

export const READBYID = async (req, res, next) => {
  try {
    const { _id } = req.body
    const find = await Model.findById(_id)
    return res.send(find)
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}

export const createValidation = [
  check('title').exists().withMessage('Requerido'),
  check('author').exists().withMessage('Requerido'),
  check('body').exists().withMessage('Requerido')
]

export const updateValidation = [check('_id').exists().withMessage('Requerido'), oneOf([check('title').exists(), check('body').exists()])]

export const readByIDValidation = [check('_id').exists().withMessage('Requerido')]
