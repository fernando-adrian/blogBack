const express = require("express");
const PostController = require("../controllers/posts")
const router = express.Router();

router.post("", PostController.createPost);
router.get("", PostController.getPosts);
router.get("/news", PostController.getNewsPosts);
router.get("/reviews", PostController.getReviewsPosts);
router.get("/indie", PostController.getIndiePosts);

module.exports = router;