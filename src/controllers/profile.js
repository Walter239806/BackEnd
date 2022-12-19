import { validateToken } from '../tools/JWT.js'

export const validate = (req, res, next) => {
  if (validateToken(req.cookies)) return res.send({ response: 'user authenticated' })
  return res.send({ response: 'User not authorized' })
}
