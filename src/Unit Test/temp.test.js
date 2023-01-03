import request from 'supertest'
import mongoose from 'mongoose'
import { app, server } from '../main.js'
import config from '../config/testing.js'

const api = request(app)
let token = null

test('Login', async () => {
  const res = await api.post('/user/JWT').send({
    username: config.TEST_USERNAME,
    password: config.TEST_PW
  })

  expect(res.statusCode).toEqual(200)
  expect(res.header).toHaveProperty('set-cookie')

  // eslint-disable-next-line prefer-destructuring
  token = res.header['set-cookie'][0].split('=')[1].split(';')[0]

  console.log(token)
})

describe('Check Posts List', () => {
  // TODO✓: test CREATE POST
  // it('create', () => {})
  // TODO: test READ BY POST
  it('Finding All posts', async () => {
    const res = await api.get('/post/readAll').set('Cookie', [`access-token=${token}`])

    expect(res.statusCode).toEqual(200)
  })
})

test('Sum testing', () => {
  expect(1 + 1).toBe(2)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
