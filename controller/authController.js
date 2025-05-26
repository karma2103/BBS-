const jwt = require('jsonwebtoken');
const JWT_SECRET = "31988263428368234";

const authController = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null; // No user is logged in
    } else {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Store user data in request object
        } catch (err) {
            req.user = null; // Token is invalid or expired
        }
    }
    next();
};

module.exports = authController;
