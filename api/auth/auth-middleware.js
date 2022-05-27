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

  function checkPasswordAndUsername(req, res, next) {
    //next()
    const {username, password} = req.body.password
    if(!password || !username.trim()) {
          res.status(422).json({
            message: "username and password required"
          })
          
    } else {
      next()
    }
  }

  module.exports = {
    checkUsernameFree,
    checkPasswordAndUsername
  }