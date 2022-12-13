import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/basicErrorHandlers.js'
import { logger } from './tools/basiclogs.js'
import config from './config/index.js'
import database from './database/index.js'

// middleware
const app = express()

app.use(express.json())
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(cookieParser())
app.use(routes)
app.use(errorHandler)

process.on('uncaughtException', error => {
  logger.error('uncaughtException = ', error)
  process.exit(1)
})

process.on('unhandledRejection', error => {
  logger.error('unhandledRejection! :', error)
  process.exit(1)
})

// Listener WebServer Express
// const NODE_PORT = 3001;
// app.listen(NODE_PORT, ()=>{
// console.log(`Escuchando puerto ${NODE_PORT}`);

//  });

database.setConnection().then(() => {
  app.listen(config.NODE_PORT, () => {
    // console.log("port listening " + config.NODE_PORT);

    logger.info(`Listening to port ${config.NODE_PORT}`)
  })
})
