import { validateToken } from '../tools/JWT.js'

export const validate = (req, res, next) => {
  if (validateToken) return res.send({ response: 'user authenticated' })
  return res.send({ response: 'User not authorized' })
}
