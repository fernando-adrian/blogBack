const express = require("express");
const PostController = require("../controllers/posts")
const router = express.Router();
const fileUpload = require('../middleware/file')

router.post("", fileUpload, PostController.createPost);
router.get("", PostController.getPosts);
router.get("/news", PostController.getNewsPosts);
router.get("/reviews", PostController.getReviewsPosts);
router.get("/indie", PostController.getIndiePosts);
router.get("/:uid", PostController.getOnePost);

module.exports = router;