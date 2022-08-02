const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  console.log("create post");
  
  const url = req.protocol + "://" + req.get("host");
  
  const post = new Post({
    title: req.body.title,
    postCollection: req.body.postCollection,
    content: req.body.content,
    contentPreview: req.body.contentPreview,
    author: req.body.author,
    createDate: req.body.createDate,
    totalLikes: 0,
    imageUrl: url + '/img/' + req.file.filename
  });

  post
    .save()
    .then((createdPost) => {
      console.log("post creado: ", createdPost);
      res.status(201).json({
        message: "Post added!!",
        post: {
          ...createdPost,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to create the post!",
      });
    });
};

exports.getNewsPosts = (req, res, next) => {
  getAllPostsByFilter(req, res, next, "NEWS");
};

exports.getReviewsPosts = (req, res, next) => {
  getAllPostsByFilter(req, res, next, "REVIEWS");
};

exports.getIndiePosts = (req, res, next) => {
  getAllPostsByFilter(req, res, next, "INDIE");
};

exports.getPosts = (req, res, next) => {
  getAllPostsByFilter(req, res, next);
};

function getAllPostsByFilter(req, res, next, filter) {
  console.log("get all posts by filter");

  const pageSize = req.query.pageSize;
  const currentPage = req.query.page;
  console.log(req);

  var postQuery;
  if (filter === undefined) postQuery = Post.find();
  else postQuery = Post.find().where("postCollection").equals(filter);
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      console.log(fetchedPosts);
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching posts Failed!!",
      });
    });
}
