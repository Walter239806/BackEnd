import jwt from 'jsonwebtoken'
import config from '../config/index.js'

export const createToken = Model => {
  const access = jwt.sign({ username: Model.username, _id: Model._id }, config.JWTSecret)
  return access
}

export const validateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const accessToken = req.cookies['access']
  if (!accessToken) return res.send({ response: 'No token' })

  try {
    const validToken = jwt.verify(accessToken, config.JWTSecret)
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (error) {
    return next({
      Code: 400,
      message: error.message
    })
  }
}
