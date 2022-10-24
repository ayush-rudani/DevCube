const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const protect = async (req, res, next) => {
    let token;
    try {
        const { jwtToken } = req.body;
        // console.log("jwtToken->", jwtToken);
        token = jwtToken;

        // Verify token
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        // Get user from the token
        var user = await User.findById(verify.userId);
        req.user = user;
        req.token = token;
        req.userId = user.id;
        next();

    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
        console.log(err);
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}

module.exports = { protect };