const { Capsule, User } = require('../models/index.js')

class ControllerCapsule {
    static list(req, res, next) {
        let options2 = {}
        if (Object.keys(req.query).includes('status')) options2 = { status: req.query.status }
        User.findOne({ where: { id: req.user.id }, attributes: { exclude: ['createdAt', 'updatedAt', 'email', 'password'] }, include: [{ model: Capsule, where: options2, attributes: { exclude: ['createdAt', 'updatedAt'] }, order: ['timeRelease', 'DESC'] }] })
            .then(data => {
                if (data?.Capsules == null) res.status(404).json({ message: "Time capsule not found" })

                let result = data.Capsules.map(el => {
                    return {
                        id: el.id,
                        subject: new Date(el.timeRelease) <= new Date() ? el.subject : 'Hidden',
                        message: new Date(el.timeRelease) <= new Date() ? el.message : 'Hidden',
                        timeRelease: el.timeRelease,
                    }
                })
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ message: err.message || "Internal server error" })
            })
    }

    static create(req, res, next) {
        let id = req.user.id
        let { subject, message, timeRelease } = req.body
        Capsule.create({ subject, message, timeRelease: new Date(timeRelease), UserId: id, status: false })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: err.message || "Internal server error" })
            })
    }
}

module.exports = ControllerCapsule