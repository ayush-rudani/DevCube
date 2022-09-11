const Post = require("../models/post");
const { post } = require("../routes/user-routes");

const getAllPost = async (req, res, nxt) => {
    let posts;
    try {
        posts = await Post.find();
    }
    catch (err) {
        return console.log(err);
    }
    if (!posts) {
        return res.staus(404).json({ message: 'No post found' });
    }
    return res.status(200).json({ posts });
}

const createPost = async (req, res, nxt) => {
    const { title, content, image, user } = req.body;
    const newPost = new Post({
        title, content, image, user
    });

    try {
        await newPost.save();
    }
    catch (err) {
        return console.log(err);
    }
    return res.status(200).json({ message: "Post created successfully" });
}

const updatePost = async (req, res, nxt) => {
    const { title, content } = req.body;
    const postId = req.params.id;
    let post;
    try {
        const post = await Post.findByIdAndUpdate(postId, { title, content });
    }
    catch (err) {
        return console.log(err);
    }
    if (!post) {
        return res.status(500).json({ message: "Post not found (Unable to found" });
    }
    return res.satus(200).json({ message: "Post updated successfully", post });
}

module.exports = {
    getAllPost, createPost, updatePost
};

