const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { tye: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    // user: { type : Schema.Types.ObjectId, ref: 'User', required: true },
    user: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
