const variable = require('.//localVariable.js')
var store = variable.store

module.exports = {
  getComments(req, res) {
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    res.status(200).send(store.posts[postId].comments)
  },
  addComments(req, res) {
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    if (!req.body.comments) return res.status(400).send("Missing Comment")
    store.posts[postId].comments.push(req.body.comments)
    res.status(202).send({"PostId": postId, "Post Comment": req.body.comments})

  },
  updateComment(req, res) {
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    let commentId = parseInt(req.query.commentID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    if (!req.body.comments) return res.status(400).send("Missing Comment")
    store.posts[postId].comments[commentId] = req.body.comments
    res.status(201).send({"PostId": postId, "Post Updated": store.posts[postId]})
  },
  removeComment(req, res) {
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    let commentId = parseInt(req.query.commentID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")
    //Deletion
    store.posts[postId].comments.splice(commentId, 1)
    res.status(204).send()
  }
}
