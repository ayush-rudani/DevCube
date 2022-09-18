const User = require('../models/Users.js');
const bcrypt = require('bcryptjs');
// app.use("/api/user", userR);
const getAllUser = async (req, res, nxt) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        condole.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: 'No user found' });
    }
    return res.status(200).json({ users });
}


// router.post("/signup", userC.signup);
const signup = async (req, res, nxt) => {
    const { name, email, username, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(422).json({ message: 'User already exists' });
    }
    // const hashedPassword = bcrypt.hashSync(password);
    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err);
    }
    const newUser = new User({
        name,
        email,
        username,
        password: hashedPassword,
        posts: [],
    });
    try {
        await newUser.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ user: newUser, message: 'User created successfully' });
}


// router.post("/login", userC.login);
const login = async (req, res, nxt) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
        console.log(existingUser);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }



    //validate password
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return console.log(err);
    }
    res.status(200).json({ message: 'Logged in' });


    // const isValidPassword = await bcrypt.compare(password, existingUser.password);
    // if (!isValidPassword) {
    //     return res.status(404).json({ message: 'Invalid credentials' });
    // }
    // res.status(200).json({ message: 'Logged in' });

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