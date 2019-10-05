const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Response = require('../services/Response')
require('dotenv/config')

router.post('/register', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  let savedUser = await user.save()
  let token = jwt.sign({email: savedUser.email}, process.env.JWT_SECRET)
  res.json({savedUser, token})
})

router.post('/login', async (req, res) => {
  let user = await User.findOne({email: req.body.email})
  user = user.toObject()
  console.log(Response({
    data: {
      message: 'all is good'
    }
  }))
  if (user) {
    if(bcrypt.compareSync(req.body.password, user.password)) {
      delete user.password
      delete user._id
      res.json({
        user,
        token: jwt.sign({email: user.email}, process.env.JWT_SECRET)})
    } else {
      res.json({err: {message: 'invalid credentials'}})
    }
  } else {
    res.json({err: {message: 'invalid credentials'}})
  }
})

router.use((req, res, next) => {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      next()
    } else {
      res.json(err)
    }
  });
})

router.get('/', async (req, res) => {
  User.find()
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router
