const { mongoose, model } = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // userId
    image: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userName: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', reqired: true }],

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
