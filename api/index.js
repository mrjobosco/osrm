require('dotenv').config()
const express = require('express')
const app = express()
const os = require('os')
const http = require('http')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3333


// Local Imports
const log = require('./util/logger')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

require('./routes')(app)

// log exceptions without halting system
process.on('uncaughtException', function (err) {
  log.error(err)
})

http.createServer(app)
  .listen(PORT, () => {
    log.info(`up and running @: ${os.hostname()} on port: ${PORT}`)
  })
