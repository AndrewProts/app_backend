const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({message: err})
  }
  res.send('posts')
})

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })
  try {
    const savedPOst = await post.save()
    res.json(savedPOst)
  } catch (err) {
    res.json({message: err})
  }

})

module.exports = router
