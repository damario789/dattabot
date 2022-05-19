const {User} = require('../models/index.js')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    const {access_token} = req.headers
    if (access_token) {
        try {
            const payload = jwt.verify(access_token, process.env.SECRET_KEY)
            User
                .findByPk(payload.id)
                .then(user => {
                    if (user) {
                        req.user = {id: user.id}
                        next()
                    } else {
                        res.status(401).json({message: 'Invalid Email/Password'})
                    }
                })
        } catch (error) {
            res.status(401).json({message: 'Invalid Email/Password'})
        }
    } else {
        res.status(401).json({message: 'Please Login'})
    }
}

module.exports = {authentication}