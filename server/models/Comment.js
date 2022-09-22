const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // Parent Post
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  parentC: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});




module.exports = mongoose.model("Comment", commentSchema);