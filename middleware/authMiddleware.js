const protect = (req, res, next) => {
    const user = req.session.user
    if (!user) {
        return res.status(400).json({ "status": 'FAILED', message: "ACCESS FORBIDDEN" })
    } else {
        next()
    }
}

module.exports = protect;
