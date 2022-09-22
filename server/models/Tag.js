const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' }],
});

module.exports = mongoose.model("Tag", tagSchema);

