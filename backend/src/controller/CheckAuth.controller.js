const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

const CheckAuthcontroller = async (req, res) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ isAuthenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        res.json({
            isAuthenticated: true,
            user
        });
    } catch (error) {
        res.status(401).json({ isAuthenticated: false });
    }
}

module.exports = CheckAuthcontroller
