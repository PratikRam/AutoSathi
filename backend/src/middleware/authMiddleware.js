const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const protect = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);

    if (!token) {
        console.log("plz login or signUp first");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        res.status(500).json({
            massage: "invalide"
        })
    }
}

module.exports = protect