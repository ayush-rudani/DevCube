const express = require("express");
const router = express.Router();
const postC = require("../controllers/post-controller");

router.get('/', postC.getAllPost);
router.post('/new', postC.createPost);
router.put('/update/:id', postC.updatePost);
router.delete('/del/:id', postC.deletePost);
router.get('/user/:id', postC.getPostsByUserId);



module.exports = router;