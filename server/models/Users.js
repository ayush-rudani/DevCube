const mongoose = require("mongoose");

const Schema = new mongoose.Schema();

// Here we have defined a schema(structure of perticular document) for our user model. all the properties that we required for each user document. 
// Model is a class with which we construct documents. In this case, each document will be a user with properties and behaviors as declared in our schema.

const userSchema = new Schema({
    name: { String, required: true },
    email: { String, required: true },
    password: { String, required: true },
});

module.exports = mongoose.model('User', userSchema);

