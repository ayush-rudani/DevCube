const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const commentController = require('../controllers/comment-controller');
const { getCommentByPostId, createComment } = commentController;

router.get('/:postId', getCommentByPostId);
router.post('/', createComment);

module.exports = router;