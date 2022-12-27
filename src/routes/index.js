import express from 'express'
import { profile } from '../controllers/profile.js'
import { loginJWT } from '../controllers/loginJWT.js'
import { CREATE, UPDATE, READALL, READBYID } from '../controllers/post.js'
import { CREATEUSR, UPDATEUSR, DELETEUSR } from '../controllers/user.js'
import { changePass } from '../controllers/changepassword.js'
import { login } from '../controllers/login.js'
import checkToken from '../middlewares/token.js'
import validateTokenC from '../middlewares/JWT.js'
import { validateUSR } from '../middlewares/validator.js'

const router = express.Router()
const APP_NAME = 'nodejs app'
const APP_VERSION = '1.0.0'

router.get('/healthcheck', (_, res) => {
  res.send({
    app: APP_NAME,
    version: APP_VERSION
  })
})

router.post('/post/create', checkToken, CREATE)
router.post('/post/update', UPDATE)

router.get('/post/readAll', validateTokenC, READALL)
router.post('/post/readAll', validateTokenC, READBYID)

// router.users
// TODO✓: validar campos requeridos: username - password - fullname (express-validator)
router.post('/user/create', validateUSR, CREATEUSR)
router.post('/user/update', validateTokenC, validateUSR, UPDATEUSR)
router.post('/user/delete', validateTokenC, DELETEUSR)

// router.changepassword
router.post('/user/changeP', validateTokenC, changePass)

// router.login
router.post('/user/login', login)
router.post('/user/JWT', loginJWT)
router.get('/user/profile', validateTokenC, profile)

export default router
