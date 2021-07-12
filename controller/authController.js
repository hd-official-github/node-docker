const User = require('../models/userModel')

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({
            status: true,
            message: "user created successfully"
        })
    } catch (e) {
        res.status(400).json({
            status: true,
            message: "Error " + e
        })
    }
}
exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status: true,
                message: "User not found "
            })
        }
        if (password == user.password) {
            req.session.user = "is loggedin"
            return res.status(200).json({
                status: true,
                data: {
                    user: user
                }
            })
        } else {
            return res.status(400).json({
                status: true,
                message: "Passsword incorrect "
            })
        }
    } catch (e) {
        return res.status(400).json({
            status: true,
            message: "Server error "
        })
    }
}
