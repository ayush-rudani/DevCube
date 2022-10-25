const Post = require("../models/Post");
const HttpError = require('../models/http-error');
const Users = require("../models/Users");
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');



// **********************************************************

const getCommentByPostId = async (req, res, next) => {
  const { postId } = req.params;
  let comments;
  try {
    await Comment.find({ post: postId }).populate('author');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching comments failed. Pelase try again later", error: err });
  }
  if (!comments || comments.length == 0) {
    return res.status(200).json({ message: 'No comments for the post' });
  }
  res.json({ comments: comments.map((comment) => comment.toObject({ getters: true })), });
}



// ******************************************************

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }

  const { parentPost, body, author, date, parentC, userId } = req.body;
  let post;
  try {
    post = await Post.findById(parentPost); // check if the post ID exists
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Creating comment failed. Please try again later", error: err });
  }

  if (!post) {
    return next(new HttpError('Could not find post for the provided id', 404));
  }

  let user;
  try {
    user = await Users.findById(author); // check if the user ID exists
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Creating comment failed. Please try again later", error: err });
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id', 404));
  }

  let createdComment = new Comment({
    parentC,
    parentPost,
    body,
    date,
    author,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    createComment = await Comment.populate(createdComment, { path: 'author' });
    post.comments.push(createdComment);
    user.comments.push(createdComment);

    await createdComment.save({ session: sess });
    await post.save({ session: sess });
    await sess.commitTransaction();



  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Creating comment failed. Please try again later", error: err });
  }
  res.status(201).json({ comment: createdComment.toObject({ getters: true }) });
}

// ******************************************************



module.exports = {
  getCommentByPostId, createComment
}

