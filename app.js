require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const ControllerUser = require('./controllers/ControllerUser.js')
const ControllerCapsule = require('./controllers/ControllerCapsule.js')
const ControllerBull = require('./controllers/ControllerBull.js')
const { authentication } = require('./middlewares/auth')
const { Capsule } = require('./models/index.js')
const Queue = require('bull')
const cron = require('node-cron')


app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

// cron.schedule('*/1 * * * *', () => {
//   console.log('masuk')
//   ControllerBull.list()
// })

const myFirstQueue = new Queue('my-first-queue', {
  redis: { host: 'localhost', port: 4322 }
});

const job = myFirstQueue.add({}, { repeat: { cron: '*/1 * * * *' } });

myFirstQueue.process(async (job) => {
  return await ControllerBull.list()
});

app.post('/register', ControllerUser.register)
app.post('/login', ControllerUser.login)
app.use(authentication)

app.get('/capsule', ControllerCapsule.list)
app.post('/capsule', ControllerCapsule.create)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})