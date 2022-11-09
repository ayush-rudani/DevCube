const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  // date: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // ParentPost
  // parentC: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, // ParentId  // ParentComment
  // author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // author
  userName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);