import jwt from 'jsonwebtoken'
import config from '../config/index.js'

export const createToken = Model => {
  const access = jwt.sign({ username: Model.username, _id: Model._id }, config.JWTSecret, { expiresIn: '1D' })
  return access
}

// export const validateToken = cookies => {
//   // eslint-disable-next-line dot-notation
//   const accessToken = cookies['access-token']
//   // console.log(cookies)
//   if (!accessToken) return false

//   try {
//     const validToken = jwt.verify(accessToken, config.JWTSecret)
//     if (validToken) {
//       return true
//     }
//   } catch (error) {
//     return {
//       Code: 400,
//       message: error.message
//     }
//   }
// }

const validateTokenC = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization
    console.log('accessToken', accessToken)
    if (!accessToken) {
      return next({
        status: 498,
        code: 2001,
        message: `TOKEN indefinido desde ${req.protocol}://${req.get('host')}${req.originalUrl}`,
        userMessage: `Token indefinido`
      })
    }

    console.log('accessToken', accessToken)
    const bearer = accessToken.split(' ')
    const token = bearer[1]

    const validToken = await jwt.verify(token, config.JWTSecret)

    if (validToken) {
      return next()
    }
    return next({
      status: 498,
      code: 2001,
      message: `TOKEN invalido desde ${req.protocol}://${req.get('host')}${req.originalUrl}`,
      userMessage: `Token invalido`
    })
  } catch (error) {
    return {
      Code: 400,
      message: error.message
    }
  }
}

export default validateTokenC
