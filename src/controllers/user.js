import bcrypt from 'bcryptjs'
import Model from '../model/user.js'

export const CREATEUSR = async (req, res, next) => {
  try {
    const input = req.body
    input.password = bcrypt.hashSync(input.password, 12)

    const newPost = new Model(input)
    await newPost.save()

    return res.send({
      response: 'User created',
      _id: input._id
    })
  } catch (error) {
    return next({
      Code: 501,
      message: error.message
    })
  }
}

export const UPDATEUSR = async (req, res, next) => {
  try {
    const input = req.body
    input.password = bcrypt.hashSync(input.password, 12)
    const response = await Model.updateOne(
      {
        username: input.username
      },

      { ...input }
    )

    return res.send({ response: !!response.modifiedCount })
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}

export const DELETEUSR = async (req, res, next) => {
  try {
    const input = req.body
    const response = await Model.deleteOne({
      username: input.username
    })

    return res.send({ response: !!response.deletedCount })
  } catch (error) {
    return next({
      Code: 503,
      message: error.message
    })
  }
}
