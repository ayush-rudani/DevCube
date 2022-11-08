const express = require("express");
const router = express.Router();
const postC = require("../controllers/post-controller");
const auth = require("../middleware/auth");

router.get('/', postC.getAllPost);
router.get('/:uid/:page', postC.fetchPosts);
router.post('/new', auth.protect, postC.createPost2);
router.put('/update/:id', postC.updatePost);
router.delete('/del/:id', postC.deletePost);
router.get('/user/:id', postC.getPostsByUserId);



module.exports = router;