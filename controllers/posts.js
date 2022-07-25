const Post = require("../models/post");

exports.createPost = (req, res, next) => {
    console.log("create post");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    contentPreview: req.body.contentPreview,
    author: req.body.author,
    totalLikes: req.body.totalLikes,
  });

  post
    .save()
    .then((createdPost) => {
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

exports.getPosts = (req, res, next) => {
    console.log("get post");

  const pageSize = req.query.pageSize;
  const currentPage = req.query.page;

  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then((documents) => {
      fetchedPosts = documents;
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
};
