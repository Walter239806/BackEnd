import bcrypt from 'bcryptjs'
// import cookie from 'cookie-parser'
import Model from '../model/user.js'
import { createToken } from '../middlewares/JWT.js'

export const loginJWT = async (req, res, next) => {
  try {
    const input = req.body
    // TODO✓: cambiar a findOne
    const user = await Model.findOne({ username: input.username })
    // const size = Object.keys(user).lenght
    if (user != null) {
      const pass = user.password
      // compareSync
      const validPassword = bcrypt.compareSync(input.password, pass)

      if (validPassword) {
        const accessToken = createToken(Model)
        res.cookie('access-token', accessToken, { maxAge: 86400000 })
        return res.send(user._id)
      }
    } else return res.send('Usuario o Contraseña inválidos')
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}
