const express = require("express");
const router = express.Router();
const postC = require("../controllers/post-controller");
const auth = require("../middleware/auth");

// Get all posts
router.get("/:page", postC.getAllPost);

// Fetch all posts of a user
router.get("/up/:uid/:page", postC.getPostsByUserId);

// Fetch perticular post
router.get("/details/:id", postC.postDetails);

// Create a post
router.post("/new", auth.protect, postC.createPost);

// Update a post
router.put("/update/:id", postC.updatePost);

// Delete a post
router.delete("/delete/:id", auth.protect, postC.deletePost);

module.exports = router;




