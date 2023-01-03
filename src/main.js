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
// console.log(`Escuchando puerto ${NODE_PORT}`)

//  });

const conn = database.setConnection()

if (!conn) {
  logger.error('DB Conn error!:')
  process.exit(1)
}

const server = app.listen(config.NODE_PORT, () => {
  logger.info(`Listening to port ${config.NODE_PORT}`)
})

export { app, server }
// const person = {
//   name: 'Carlos',
//   id: 1
// }

// Object.keys(person).forEach(key => {
//   console.log(`key: ${key}`)
//   console.log('value :>> ', person[key])
// })

const persons = [
  {
    name: 'carlos',
    id: 1
  },
  {
    name: 'walter',
    id: 2
  }
]

let person = null
persons.forEach(element => {
  if (element.name === 'carlos') person = element
})
console.log('person forEach :>> ', person)

for (let index = 0; index < persons.length; index += 1) {
  const element = persons[index]
  if (element.name === 'carlos') person = element
}
console.log('person for :>> ', person)

// functional
const personObj = persons.find(element => {
  if (element.name === 'carlos') return element
})
console.log('personObj :>> ', personObj)
personObj.id = 3

const personArray = persons.filter(element => {
  if (element.id === 2) return element
})
console.log('personArray :>> ', personArray)

const personMap = persons.map(element => {
  element.name = `${element.name} X `

  return element
})
console.log('personMap :>> ', personMap)

const personReduce = persons.reduce((acc, element) => {
  acc += element.id

  return acc
}, 0)
console.log('personReduce :>> ', personReduce)

const personReduce2 = persons.reduce(
  (acc, element) => (acc += `${element.name} `),

  ''
)
console.log('personReduce2 :>> ', personReduce2)
