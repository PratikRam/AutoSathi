const User = require('../models/User.Model')

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { updateProfile }