const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  parentPost: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // ParentPost
  parentC: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, // ParentId  // ParentComment
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // author
});




module.exports = mongoose.model("Comment", commentSchema);