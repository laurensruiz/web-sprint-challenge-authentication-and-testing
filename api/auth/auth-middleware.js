const db = require('../../data/dbConfig')

async function checkUsernameFree(req, res, next) {
    try {
      const user = await db('users').where({username: req.body.username}) 
      if(user.length){
        res.status(401).json({
            message: 'username taken'
        })
      } else {
        next()
      }
    } catch (err){
      next(err)
    }
  }

  module.exports = {
    checkUsernameFree,
  }