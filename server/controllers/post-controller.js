const Post = require("../models/Post");
const Users = require("../models/Users");
const mongoose = require('mongoose');
const formidable = require('formidable');
// const { post } = require("../routes/user-routes");

const getAllPost = async (req, res, nxt) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }
  if (!posts) {
    return res.staus(404).json({ message: 'No post found' });
  }
  return res.status(200).json({ posts });
}

const createPost = async (req, res, nxt) => {
  const { title, body, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await Users.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const newPost = new Post({
    title, body, image, user: user
  });



  //1. save new doc with the new post
  //2. add post id to the corresponding user
  //execute multiple indirectly related operations such that if one fails, we undo all operations: transcations
  //transcations are built on "sessions"

  try {
    // await newPost.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    existingUser.posts.push(newPost);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create post", error: err });
  }
  return res.status(200).json({ message: "Post created successfully", post: newPost });
}


const createPost2 = async (req, res, nxt) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (error, fields, files) => {

    const { title, body, description, slug, id, user } = fields;
    const errors = [];

    if (title === '') {
      errors.push({ msg: 'Please add a tit' });
    }
    if (body === '') {
      errors.push({ msg: 'Please add a body' });
    }
    if (description === '') {
      errors.push({ msg: 'Please add a description' });
    }
    if (slug === '') {
      errors.push({ msg: 'Please add a slug' });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  })
  // return res.status(200).json({ data: 'hello' });
}

const updatePost = async (req, res, nxt) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  let post;
  try {
    const post = await Post.findByIdAndUpdate(postId, { title, content });
  } catch (err) {
    return console.log(err);
  } 6
  if (!post) {
    return res.status(500).json({ message: "Post not found (Unable to found" });
  }
  return res.status(200).json({ message: "Post updated successfully" });
}

const deletePost = async (req, res, nxt) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id).populate('user');
    // if (post != null) {
    // console.log(post.user);
    // await post.user.posts.pull(post);
    // }
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.remove({ session: session });  //remove doc; make sure we refer to the current session
    post.user.posts.pull(post);   //remove post id from the corresponding user
    await post.user.save({ session: session });    //save the updated user (part of our current session)
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ message: "Post deleted successfully" });
}



// getting all posts of user
const getPostsByUserId = async (req, res, nxt) => {
  let userId = req.params.id;
  let userWithPosts;
  try {
    userWithPosts = await Users.findById(userId).populate('posts');
  } catch (err) {
    return console.log(err);
  }
  if (!userWithPosts || userWithPosts.posts.length === 0) {
    return res.status(404).json({ message: "No post found for the provided user id" });
  }
  return res.status(200).json({ posts: userWithPosts });
}


module.exports = {
  getAllPost, createPost, updatePost, deletePost, getPostsByUserId, createPost2
}