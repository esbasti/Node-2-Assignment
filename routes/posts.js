const variable = require('.//localVariable.js')
var store = variable.store

module.exports = {
  getPosts(req, res) {
    res.status(200).send(store.posts)
  },
  addpost(req, res) {
    //Validation
    if (!req.body) return res.status(400).send("Missing post")
    if (!req.body.name) return res.status(400).send("Missing Post Name")

    store.posts.push(req.body)
    let postId = store.posts.length
    res.status(202).send({"PostId": postId, "Post Name": store.posts[postId-1]})
  },
  updatePost(req, res) {
    //Validation
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")

    //Query Logic
    if (req.body.name) {
      store.posts[postId].name = req.body.name
    }
    if (req.body.url) {
      store.posts[postId].url = req.body.url
    }
    if (req.body.text) {
      store.posts[postId].text = req.body.text
    }
    res.status(201).send({"PostId": postId, "Post Name": store.posts[postId]})
  },
  removePost(req, res) {
    //Validation
    let postId = parseInt(req.query.postID)
    if (store.posts[postId] === undefined) return res.status(200).send("Post do not exist under that ID Number")

    //Deletion
    store.posts.splice(postId, 1)
    res.status(204).send()
  }
}
