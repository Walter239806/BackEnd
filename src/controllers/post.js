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
    const find = await Model.find()
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
  const find = await Model.updateOne(
    {
      _id: input._id,
      'bitacora._id': input.bitacora
    },
    {
      $set: {}
    }
  )

  const data = {
    user: input.username,
    fecha: new Date()
  }
  console.log('arrayI', JSON.stringify(find, null, 2))

  // const newBitacora = await Model.updateOne(
  //   {
  //     // _id: arrayI._id
  //   },
  //   {
  //     $set : { bitacora: data }
  //   }
  // )
  // return console.log('Bitacora added:', newBitacora)
  res.send('hola')
}

export const createValidation = [
  check('title').exists().withMessage('Requerido'),
  check('author').exists().withMessage('Requerido'),
  check('body').exists().withMessage('Requerido')
]

export const updateValidation = [check('_id').exists().withMessage('Requerido'), oneOf([check('title').exists(), check('body').exists()])]

export const readByIDValidation = [check('_id').exists().withMessage('Requerido')]
