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

const goodUser = {username:'rey', password:'1234'}
const badUser = {username:'', password:'1234'}
const badPass = {username:'rey', password:''}

describe('[POST] registration', ()=> {
  it('adds user successfully after registration', async()=>{
    const res = await request(server)
      .post('/api/auth/register')
      .send(goodUser)
      .set('Accept', 'application/json')
    
    expect(res.body.username).toBe('rey')

  })
  
  it('will not add existing user', async()=>{
    const res = await request(server)
      .post('/api/auth/register')
      .send(goodUser)
      .set('Accept', 'application/json')
    
    expect(res.body.message).toBe('username taken')

  })
  it('will not add without password', async()=>{
    const res = await request(server)
      .post('/api/auth/register')
      .send(badPass)
      .set('Accept', 'application/json')
    
    expect(res.body.message).toBe("username and password required")

  })
})

describe('[POST] login', ()=> {
  it('will login successfully', async()=>{
    const res = await request(server)
      .post('/api/auth/login')
      .send(goodUser)
      .set('Accept', 'application/json')
    
    expect(res.body.message).toBe('Welcome rey')

  })
  it('will not login without username', async()=>{
    const res = await request(server)
      .post('/api/auth/login')
      .send(badUser)
      .set('Accept', 'application/json')
    
    expect(res.body.message).toBe("username and password required")

  })
})

describe('[GET] jokes', ()=> {
  it('token is required', async()=>{
    const res = await request(server)
      .get('/api/jokes')
      .set('Accept', 'application/json')
    
    expect(res.body.message).toBe("Token required")

  })
  it('token is required', async()=>{
    const res = await request(server)
      .get('/api/jokes')
      .set('Accept', 'application/json')
      .set('Authorization', '1234')
    
    expect(res.body.message).toBe("Token invalid")

  })
})
