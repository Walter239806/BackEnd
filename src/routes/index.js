import express from 'express'
import { profile } from '../controllers/profile.js'
import { loginJWT } from '../controllers/loginJWT.js'
import * as postController from '../controllers/post.js'
import { CREATEUSR, UPDATEUSR, DELETEUSR } from '../controllers/user.js'
import { changePass } from '../controllers/changepassword.js'
import { login } from '../controllers/login.js'
import checkToken from '../middlewares/token.js'
import validateTokenC from '../middlewares/JWT.js'
import * as usrValidation from '../middlewares/validator.js'
import { validate } from '../middlewares/validate.js'
import { logger } from '../tools/basiclogs.js'

const router = express.Router()
const APP_NAME = 'nodejs app'
const APP_VERSION = '1.0.0'

router.get('/healthcheck', (_, res) => {
  // logger.info('Mensaje informativo')
  // logger.debug('debug para casos de busquedas de información mas precisa')
  // logger.warn('advertencias en el código')
  // logger.error('mensajes de error', "xxxxxxx")
  // logger.error('mensajes de error', { a: '132' })

  logger.profile('test', { level: 'info' })

  // inicia el contador
  const profiler = logger.startTimer()

  setTimeout(() => {
    // finaliza el contador y registra duración
    profiler.done({ message: 'Logging message' })
  }, 5000)

  res.send({
    app: APP_NAME,
    version: APP_VERSION
  })
})

router.post('/post/create', validateTokenC, postController.createValidation, validate, postController.CREATE)
router.post('/post/update', validateTokenC, postController.updateValidation, validate, postController.UPDATE)
router.post('/post/updateB', postController.updateB)

router.get('/post/readAll', postController.READALL)
// router.post('/post/readByID', validateTokenC, postController.readByIDValidation, validate, postController.READBYID)

router.get('/post/readonly-posts', postController.READALL)
router.post('/post/readById', postController.READBYID)

// router.users
router.post('/user/create', usrValidation.vUSRCreate, validate, CREATEUSR)
router.post('/user/update', validateTokenC, usrValidation.vUSRUpdate, validate, UPDATEUSR)
router.post('/user/delete', validateTokenC, usrValidation.vUSRDelete, validate, DELETEUSR)

// router.changepassword
router.post('/user/changeP', validateTokenC, usrValidation.vChangePass, validate, changePass)

// router.login
router.post('/user/login', login)
router.post('/user/JWT', usrValidation.vLogin, validate, loginJWT)
router.get('/user/profile', validateTokenC, profile)

export default router
