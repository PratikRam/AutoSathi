const jwt = require("jsonwebtoken")
// const cookieParser = require("cookie-parser")

const protect = (req, res, next) => {
    const token = req.cookies.token
    console.log("token is this", token);

    if (!token) {
        console.log("plz login or signUp first");
        res.status(400).json({
            message: "Unauthorized"
        })
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.log("error is this", error);
        res.status(500).json({
            message: "invalide"
        })
    }
}

module.exports = protect