const User = require('../models/Users.js');
bcrypt = require('bcryptjs');


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
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({
        name,
        email,
        username,
        password: hashedPassword,
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
    }
    return res.status(201).json({ message: 'User created' });
}

const login = async (req, res, nxt) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isValidPassword) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Logged in' });

    // let existingUser;
    // try {
    //     existingUser = await User.findOne({ email: email });
    // }
    // catch (err) {
    //     console.log(err);
    // }
    // if (!existingUser) {
    //     return res.status(422).json({ message: 'Invalid credentials' });
    // }
    // const isValidPassword = bcrypt.compareSync(password, existingUser.password);
    // if (!isValidPassword) {
    //     return res.status(422).json({ message: 'Invalid credentials' });
    // }
    // return res.status(200).json({ message: 'Logged in' });
}

// const updateuser = async (req,res,next) => {
//   let existingUser;
//   try {
//         existingUser = await User.findOne({ email: email });
//   }catch (err) {
//         return console.log(err);
//   }
//   if (!existingUser) {
//         return res.status(404).json({ message: 'User not found' });
//     }
// }

module.exports = { getAllUser, signup, login };