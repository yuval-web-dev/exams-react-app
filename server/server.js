const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: './dotenv/.env' })

const { createController, readController, updateController, deleteController } = require('./controllers/index.js')
const { consoleTimeLogger } = require('./serverHelpers.js')

const app = express()
const port = 3001

app.use(express.json())

app.use(cors())

app.listen(port, consoleTimeLogger(`server started and listening on port ${port}`))

app.use((req, res, next) => {
  consoleTimeLogger(`incoming ${req.method} request from ${req.hostname}:${req.ip} RECEIVED`)
  next()
})

app.post('/api/create', createController)

app.get('/api/read', readController)

app.patch('/api/update', updateController)

app.delete('/api/delete', deleteController)

app.use((req, res) => {
  consoleTimeLogger(`incoming ${req.method} request from ${req.hostname}:${req.ip} FULFILLED`)
})