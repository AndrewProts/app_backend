const express = require('express')
const app = express()
const mobgoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const postRoute = require('./reoutes/posts')
const userRoute = require('./reoutes/user')
app.use('/posts', postRoute)
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send('hello world')
})



mobgoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => {
  console.log('connected to db')
})

app.listen(3000)
