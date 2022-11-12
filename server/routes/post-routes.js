const express = require("express");
const router = express.Router();
const postC = require("../controllers/post-controller");
const auth = require("../middleware/auth");

router.get("/:page", postC.getAllPost);

// fetch all posts of a user
router.get("/up/:uid/:page", postC.fetchPosts);

// router.get('/home', postC.getHomePosts);

// fetch perticular post
router.get("/details/:id", postC.postDetails);

router.post("/comment", auth.protect, postC.postComment);

router.post("/new", auth.protect, postC.createPost);
router.put("/update/:id", postC.updatePost);
router.delete("/delete/:id", auth.protect, postC.deletePost);
router.get("/user/:id", postC.getPostsByUserId);

module.exports = router;
