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

const validateTokenM = (req, res, next) => {
  try {
    const accessToken = req.cookies['access-token']
    if (!accessToken)
      return next({
        status: 498,
        code: 2001,
        message: `TOKEN indefinido desde ${req.protocol}://${req.get('host')}${req.originalUrl}`,
        userMessage: `Token indefinido`
      })

    const validToken = jwt.verify(accessToken, config.JWTSecret)
    if (validToken) {
      return next()
    }
  } catch (error) {
    return {
      Code: 400,
      message: error.message
    }
  }
}

export default validateTokenM
