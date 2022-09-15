const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' }],
  
});

