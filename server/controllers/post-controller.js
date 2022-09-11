const Post = require("../models/post");

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

module.exports = {
    getAllPost
};

