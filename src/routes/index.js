import express from 'express'
import { CREATE, UPDATE } from '../controllers/post.js'
import { CREATEUSR, UPDATEUSR, DELETEUSR } from '../controllers/user.js'
import { changePass } from '../controllers/changepassword.js'
import { login } from '../controllers/login.js'
import { loginJWT } from '../controllers/loginJWT.js'
import { validate } from '../controllers/profile.js'

const router = express.Router()
const APP_NAME = 'nodejs app'
const APP_VERSION = '1.0.0'

router.get('/healthcheck', (_, res) => {
  res.send({
    app: APP_NAME,
    version: APP_VERSION
  })
})

// router.post('/test', TEST);
router.post('/post/create', CREATE)
router.post('/post/update', UPDATE)

// router.users
router.post('/user/create', CREATEUSR)
router.post('/user/update', UPDATEUSR)
router.post('/user/delete', DELETEUSR)

// router.changepassword
router.post('/user/changeP', changePass)

// router.login
router.post('/user/login', login)
router.post('/user/JWT', loginJWT)
router.get('/user/profile', validate)

export default router
