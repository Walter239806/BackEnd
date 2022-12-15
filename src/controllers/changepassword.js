import bcrypt from 'bcryptjs'
import Model from '../model/user.js'

export const changePass = async (req, res, next) => {
  try {
    const input = req.body
    const valor = await Model.find({ _id: input._id }).lean()
    const pass = valor[0].password
    const validPassword = await bcrypt.compare(input.password, pass)
    if (validPassword) {
      if (input.newP === input.confirmP) {
        // if (bcrypt.compare(input.newP === pass)) {
        //   return res.send({ response: 'Password es igual al antiguo' })
        // }
        await Model.updateOne(
          {
            _id: input._id
          },
          {
            password: bcrypt.hashSync(input.newP, 12)
          }
        )
        return res.send({ response: 'Se cambio el password correctamente' })
      }
      return res.send({ response: 'Password nuevo no coincide' })
    }
    return res.send({ response: 'Password antiguo no coincide' })
  } catch (error) {
    return next({
      Code: 502,
      message: error.message
    })
  }
}
