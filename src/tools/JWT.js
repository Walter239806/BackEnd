import jwt from 'jsonwebtoken'
import config from '../config/index.js'

export const createToken = Model => {
  const access = jwt.sign({ username: Model.username, _id: Model._id }, config.JWTSecret, { expiresIn: '1D' })
  return access
}

export const validateToken = cookies => {
  // eslint-disable-next-line dot-notation
  const accessToken = cookies['access-token']
  // console.log(cookies)
  if (!accessToken) return false

  try {
    const validToken = jwt.verify(accessToken, config.JWTSecret)
    if (validToken) {
      return true
    }
  } catch (error) {
    return {
      Code: 400,
      message: error.message
    }
  }
}
