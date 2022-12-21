import bcrypt from 'bcryptjs'
// import cookie from 'cookie-parser'
import Model from '../model/user.js'
import { createToken } from '../tools/JWT.js'

export const loginJWT = async (req, res, next) => {
  try {
    const input = req.body
    // TODO: cambiar a findOne
    const user = await Model.find({ username: input.username }).lean()
    const size = user.length
    if (size > 0) {
      const pass = user[0].password
      // compareSync
      const validPassword = await bcrypt.compare(input.password, pass)

      if (validPassword) {
        const accessToken = createToken(Model)
        res.cookie('access-token', accessToken, { maxAge: 86400000 })
        return res.send(user[0]._id)
      }
      return res.send({ response: 'Bad password' })
      // return next({ status: 400, code: 102, userMessage: 'Usuario o Contraseña inválidos' })
    }
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}
