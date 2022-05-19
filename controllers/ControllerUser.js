const { User } = require('../models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class ControllerUser {
    static register(req, res, next) {
        let { email, password } = req.body

        let newUser = {
            email, password
        }

        User.create(newUser)
            .then(user => {
                res.status(201).json({ id: user.id, email: user.email })
            })
            .catch(err => {
                if (Array.isArray(err.errors)) {
                    let errorMessages = err.errors.map(el => el.message)
                    res.status(400).json({ message: errorMessages })
                } else {
                    res.status(500).json({ message: err.message || "Internal server error" })
                }
            })
    }

    static login(req, res) {
        let { email, password } = req.body

        User.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'Account does not exist' })
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        let access_token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY)
                        res.status(200).json({ access_token })
                    } else {
                        res.status(401).json({ message: 'Invalid Email/Password' })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message || "Internal server error" })
            })
    }
}

module.exports = ControllerUser
