const express = require('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const bodyParser = require('body-parser')

const notifications = require('./routes/notifications')
const app = express()
app.use(bodyParser.json())

morganBody(app)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/notifications', notifications)

app.listen(8000, '0.0.0.0', function () {
  console.log('Listening to Port 8000')
})