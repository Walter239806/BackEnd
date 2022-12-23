import bcrypt from 'bcryptjs'
import Model from '../model/user.js'

export const CREATEUSR = async (req, res, next) => {
  try {
    const input = req.body
    // eslint-disable-next-line no-console
    //  console.log('input:', input)

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
    const response = await Model.updateOne(
      {
        _id: input._id
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
    // console.log('input:', input)

    const response = await Model.deleteOne({
      _id: input._id
    })

    return res.send({ response: !!response.deletedCount })
  } catch (error) {
    return next({
      Code: 503,
      message: error.message
    })
  }
}
