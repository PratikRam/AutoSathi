const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const registerController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let userExistes = await User.findOne({ email })
        if (userExistes) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // ❗ false in localhost
            sameSite: "Lax"      // or "Strict"
        })
        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' })
    }
}

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
        const userOne = await User.findOne({
            email
        })
        console.log(userOne);

        if (!userOne) {
            res.status(401).json({
                message: "unauthorized..! please check your email"
            })
            return
        }
        const userPassword = await bcrypt.compare(password, userOne.password)

        if (!userPassword) {
            res.status(401).json({
                message: "Password invalide"
            })
            return
        }

        // const token = jwt.sign({ id: userOne._id }, process.env.JWT_SECRET)
        // res.cookie('token', token)
        const token = jwt.sign({ id: userOne._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // ❗ false in localhost
            sameSite: "Lax"      // or "Strict"
        })

        res.status(200).json({
            user: userOne,
            message: "logged in succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logoutController = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Logout failed",
        });
    }
};

module.exports = { registerController, loginController, logoutController }

