import express from 'express';
import {CREATEPOST} from '../controllers/post.js';

const router = express.Router();
const APP_NAME= "nodejs app";
const APP_VERSION = "1.0.0";

router.get("/healthcheck",(_, res)=>{

    res.send({
    app: APP_NAME,
    version: APP_VERSION,

    })
})

//router.post('/test', TEST);
router.post('/post/create', CREATEPOST);

export default router;



