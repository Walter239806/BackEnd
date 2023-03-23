import bcrypt from 'bcryptjs'
// import cookie from 'cookie-parser'
import Model from '../model/user.js'
import { createToken } from '../middlewares/JWT.js'

export const loginJWT = async (req, res, next) => {
  try {
    console.log('Session')
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 3000))

    const input = req.body
    const user = await Model.findOne({ username: input.username })

    //  console.log('user :>> ', user)
    if (user != null) {
      const pass = user.password
      const validPassword = bcrypt.compareSync(input.password, pass)

      if (validPassword) {
        const accessToken = createToken(user)
        res.cookie('access-token', accessToken, { maxAge: 86400000 })
        return res.send({ accessToken })
      }
    }
    return res.status(400).send({ error: 'Usuario o Contraseña inválidos' })
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}
