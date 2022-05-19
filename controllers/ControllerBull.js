const { Capsule, User } = require('../models/index.js')
const Queue = require('bull')
const nodemailer = require('nodemailer')

class ControllerBull {
    static async list() {

        let result = await User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [{ model: Capsule }] })

        JSON.parse(JSON.stringify(result)).forEach(async (el) => {
            el.Capsules.forEach(async (capsule) => {
                if (new Date(capsule.timeRelease) <= new Date() && !capsule.status) {
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: el.email,
                        subject: capsule.subject,
                        text: `Capsule with id ${capsule.id} has been released.\n\n${capsule.message}`
                    };
                    let mailConfig = {
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                    };
                    const transport = nodemailer.createTransport(mailConfig)
                    await transport.sendMail(mailOptions).then(() => {
                        return Capsule.update({ status: true }, { where: { id: capsule.id } })
                    }).then((notif) => console.log(notif)).catch(err => console.log(err))
                }
            })
        })

    }
}

module.exports = ControllerBull