const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Users = require("../models/Users");
const Post = require("../models/Post");
const fs = require("fs");


const getAllPost = async (req, res) => {
  const page = req.params.page;
  const perPage = 6;
  const skip = (page - 1) * perPage;
  try {
    const count = await Post.find({}).countDocuments();
    const posts = await Post.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ response: posts, count, perPage });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};


const createPost = async (req, res, nxt) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (error, fields, files) => {
    const { title, body, description, slug, id, name } = fields;
    const errors = [];
    if (title === "") {
      errors.push({ msg: "Please add a title" });
    }
    if (body === "") {
      errors.push({ msg: "Please add a body" });
    }
    if (description === "") {
      errors.push({ msg: "Please add a description" });
    }
    if (slug === "") {
      errors.push({ msg: "Please add a slug" });
    }
    if (Object.keys(files).length === 0) {
      errors.push({ msg: "Image is required" });
    } else {
      const { mimetype } = files.image;
      // console.log(mimetype);
      const splitname = mimetype.split("/");
      const extension = splitname[1].toLowerCase();

      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        errors.push({ msg: `Please upload an image of type 'jpeg' or 'png'` });
      } else {
        files.image.originalFilename = uuidv4() + "." + extension;
      }
    }

    const checkSlug = await Post.findOne({ slug });
    if (checkSlug) {
      errors.push({ msg: "Please choose a unique slug/URL" });
    }

    if (errors.length !== 0) {
      return res.status(400).json({ errors, files });
    } else {
      const newPath =
        __dirname +
        `../../../client/public/images/${files.image.originalFilename}`;
      fs.copyFile(files.image.filepath, newPath, async (error) => {
        if (!error) {

          // console.log('File uploaded successfully');
          const newPost = new Post({
            title,
            body,
            image: files.image.originalFilename,
            userName: name,
            user: id,
            description,
            slug
          });

          let existingUser;
          try {
            existingUser = await Users.findById(id);
          } catch (err) {
            return console.log(err);
          }

          try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await newPost.save({ session });
            existingUser.posts.push(newPost);
            await existingUser.save({ session });
            await session.commitTransaction();

            response = newPost;
            return res.status(200).json({
              msg: "Your post has been created successfully",
              response,
            });
          } catch (err) {
            return res.status(500).json({ errors: err, msg: err.message });
          }
        }
        // else {
        //   console.log(error);
        // }
      });
    }
    // return res.json({ files });
  });
};

// fetch post by userId
const getPostsByUserId = async (req, res, nxt) => {
  const uid = req.params.uid;
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {
    const count = await Post.find({ user: uid }).countDocuments();
    const response = await Post.find({ user: uid })
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ response: response, count, perPage });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

// Fetch Post 
const postDetails = async (req, res, nxt) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ _id: id });
    const comments = await Comment.find({ postId: post._id }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({ post, comments });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};


const updatePost = async (req, res, nxt) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  let post;
  try {
    const post = await Post.findByIdAndUpdate(postId, { title, content });
  } catch (err) {
    return console.log(err);
  }
  6;
  if (!post) {
    return res.status(500).json({ message: "Post not found (Unable to found" });
  }
  return res.status(200).json({ message: "Post updated successfully" });
};


const deletePost = async (req, res, nxt) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const response = await Post.findByIdAndRemove(id);
    return res.status(200).json({ message: "Your Post has been deleted." });
  } catch (error) {
    return res.status(500).json({ errors: error, message: error.message });
  }
};



module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  postDetails,
  getPostsByUserId,
  // fetchPosts,
  // postComment,
};
