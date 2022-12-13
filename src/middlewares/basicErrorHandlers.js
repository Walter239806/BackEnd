import { logger } from '../tools/basiclogs.js'

export const errorHandler = (err, req, res, next) => {
  logger.error('error message= ', err.message)
  logger.error('error code= ', err.code)

  // console.log("err.message = ", err.message);
  // console.log("err.code = ", err.code);

  return res.status(505).send({
    errorCode: err.code,
    errorMessage: err.message
  })
}
