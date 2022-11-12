const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false },
    // username: { type: String, required: false, unique: true },
    password: { type: String, required: true, minlength: 6 },

    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],

    // Basic Information about user     -----------------
    bio: { type: String, required: false },
    website: { type: String, required: false },
    // location: { type: String, required: false },

    // Social Media Links   ----------
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
    github: { type: String, required: false },

    // Coidng   ---------------
    skills: { type: [String], required: false },
    status: { type: String, required: false },

    // Work     ------------------
    work: { type: String, required: false },
    education: { type: String, required: false },

});

module.exports = mongoose.model("User", userSchema);



