const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Here we have defined a schema(structure of perticular document) for our user model. all the properties that we required for each user document.
// Model is a class with which we construct documents. In this case, each document will be a user with properties and behaviors as declared in our schema.

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },

    // Basic Information about user     -----------------
    bio: { type: String, required: false },
    website: { type: String, required: false },
    // location: { type: String, required: false },

    // Social Media Links   ----------
    // twitter: { type: String, required: false },
    // linkedin: { type: String, required: false },
    // github: { type: String, required: false },

    // Coidng   ---------------
    // skills: { type: [String], required: false },
    // status: { type: String, required: false },

    // Work     ------------------
    // work: { type: String, required: false },
    // education: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
