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

module.exports = getAllUser;