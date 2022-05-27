const request = require('supertest')
const db = require('../data/dbConfig')
const server= require('./server')

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db("users").truncate();
  await db.destroy();
});

