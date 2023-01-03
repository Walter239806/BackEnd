import request from 'supertest'
import mongoose from 'mongoose'
import { app, server } from '../main.js'
import testing from '../config/testing.js'

const api = request(app)
let token = null

test('Login', async () => {
  // console.log(testing)
  const res = await api.post('/user/JWT').send({
    username: testing.TEST_USERNAME,
    password: testing.TEST_PW
  })

  expect(res.statusCode).toEqual(200)
  expect(res.header).toHaveProperty('set-cookie')
  // eslint-disable-next-line prefer-destructuring
  token = res.header['set-cookie'][0].split('=')[1].split(';')[0]

  console.log(token)
})

describe('Check Posts List', () => {
  it('Create post', async () => {
    const res = await api
      .post('/post/create')
      .set('Cookie', [`access-token=${token}`])
      .send({ title: 'Jest3', author: 'Jest', state: true, body: 'Test for jest' })

    // .set('title', 'jest2')
    // .set('author', 'Walter Test')
    // .set('body', 'This is a test for jest')
    // .set({ title: 'Jest3', author: 'Jest', state: true, body: 'Test for jest' })
    //  console.log('******************', res)
    expect(res.statusCode).toEqual(200)
  })

  it('Read by ID', async () => {
    const res = await api
      .post('/post/readByID')
      .set('Cookie', [`access-token=${token}`])
      .set('_id', '63b3c3c4f35d8a426fad2053')
    expect(res.statusCode).toEqual(200)
  })

  it('Finding All posts', async () => {
    const res = await api.get('/post/readAll').set('Cookie', [`access-token=${token}`])
    expect(res.statusCode).toEqual(200)
  })
})

// test('Sum testing', () => {
//   expect(1 + 1).toBe(2)
// })

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
