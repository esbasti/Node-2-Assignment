const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')
const errorhandler = require('errorhandler')

//Module Import
const post = require('./routes/posts.js')
const comment = require('./routes/comments.js')

//App Init
const app = express()
const port = 3000
app.use(bodyParser.json())

//Server Logic
app.get("/posts", (req, res) => {
  post.getPosts(req, res)
})

app.post("/posts", (req, res) => {
  post.addpost(req, res)
})

app.use((req, res, next) => {
  if (!req.query.postID) return res.status(400).send("Please Provide Post ID")
  if (!Number.isInteger(parseInt(req.query.postID))) return res.status(400).send("Post ID must be a number")
  next()
})

app.put("/posts", (req, res) => {
  post.updatePost(req, res)
})

app.delete("/posts", (req, res) => {
  post.removePost(req, res)
})

app.get("/posts/comments", (req, res) => {
  comment.getComments(req, res)
})

app.post("/posts/comments", (req, res) => {
  comment.addComments(req, res)
})

app.use((req, res, next) => {
  if (!req.query.commentID) return res.status(400).send("Please Provide Post ID")
  if (!Number.isInteger(parseInt(req.query.commentID))) return res.status(400).send("Comment ID must be a number")
  next()
})

app.put("/posts/comments", (req, res) => {
  comment.updateComment(req, res)
})

app.delete("/posts/comments", (req, res) => {
  comment.removeComment(req, res)
})

app.listen(port)
