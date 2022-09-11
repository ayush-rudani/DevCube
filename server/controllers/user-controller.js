const User = require('../models/Users.js');

const getAllUser = async (req, res, nxt) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        condole.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: 'No user found' });
    }
    return res.status(200).json({ users });
}

const signup = async (req, res, nxt) => {
    const { name, email, username, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(422).json({ message: 'User already exists' });
    }
    const newUser = new User({
        name,
        email,
        username,
        password
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
    }
    return res.status(201).json({ message: 'User created' });
}

module.exports = { getAllUser, signup };