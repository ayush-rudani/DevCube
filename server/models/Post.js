const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', reqired: true }],
});

module.exports = mongoose.model("Post", postSchema);
