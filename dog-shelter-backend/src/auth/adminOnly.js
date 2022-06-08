module.exports = (req, res, next) => {
    if(req.user.isAdmin === false) {
        return res.sendStatus(403)
    }
    console.log(req.user)
    next()
}
