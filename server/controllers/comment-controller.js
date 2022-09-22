const Post = require("../models/Post");
const Users = require("../models/Users");
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

const getCommentByPostId = async (req, res, next) => {
  const { postId } = req.params;
  let comments;
  try {
    await Comment.find({ post: postId }).populate('user');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching comments failed. Pelase try again later", error: err });
  }

}