import { check, oneOf } from 'express-validator'
import Model from '../model/post.js'
import { bitacora } from './bitacora.js'
import { MetaData } from './metadata.js'

export const CREATE = async (req, res, next) => {
  try {
    const input = req.body
    input.bitacora = {
      user: input.author,
      fecha: new Date()
    }
    input.metadata = {
      hash: (Math.random() + 1).toString(36).substring(7),
      num: Math.random()
    }

    const newPost = new Model(input)
    const result = await newPost.save()
    // const { _id } = result
    // const username = input.author
    // await MetaData()
    // await bitacora(_id, username)

    res.send('ok')
  } catch (error) {
    return next({
      code: 501,
      message: error.message
    })
  }
}

export const UPDATE = async (req, res, next) => {
  try {
    const input = req.body
    const { _id, author } = input

    const response = await Model.updateOne(
      {
        _id
      },

      { ...input }
    )
    await bitacora(_id, author)
    // console.log('result', response)

    res.send('ok')
  } catch (error) {
    return next({
      code: 502,
      message: error.message
    })
  }
}

export const READALL = async (req, res, next) => {
  try {
    console.log('💣💣💣')
    const find = await Model.find({}, { title: 1, author: 1, createdAt: 1 })
    console.log('Aqui estoy')
    return res.send(find)
  } catch (error) {
    return next({
      code: 502,
      message: error.message
    })
  }
}

export const READBYID = async (req, res, next) => {
  try {
    const { _id } = req.body
    const find = await Model.findById(_id)
    console.log(find)
    return res.send(find)
  } catch (error) {
    return next({
      code: 502,
      message: error.message
    })
  }
}

export const updateB = async (req, res, next) => {
  const input = req.body
  console.log('HOLAAAAAAAAAAA', input)
  const find = await Model.findOneAndUpdate(
    {
      _id: input._id,
      bitacora: { $elemMatch: { user: input.bitacora } }
    },
    {
      $set: {
        'bitacora.$[i].user': input.username,
        'bitacora.$[i].fecha': new Date()
      }
    },
    {
      arrayFilters: [{ 'i.user': { $eq: input.bitacora } }],
      new: true
    }
  )
  console.log('UPDATE', JSON.stringify(find, null, 2))
  res.send('ok')
}

export const createValidation = [
  check('title').exists().withMessage('Requerido'),
  check('author').exists().withMessage('Requerido'),
  check('body').exists().withMessage('Requerido')
]

export const updateValidation = [check('_id').exists().withMessage('Requerido'), oneOf([check('title').exists(), check('body').exists()])]

export const readByIDValidation = [check('_id').exists().withMessage('Requerido')]
