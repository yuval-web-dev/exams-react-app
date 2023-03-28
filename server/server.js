const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: './dotenv/.env' })

const { createController, readController, updateController, deleteController } = require('./controllers/index.js')
const { logger } = require('./helpers.js')

const app = express()
const router = express.Router()
const port = 3001

app.use(express.json())

app.use(cors())

app.listen(port, logger(`server started and listening on port ${port}`))

app.use((req, res, next) => {
  logger(`incoming ${req.method} request from ${req.hostname}:${req.ip} RECEIVED`)
  next()
})

app.post('/api/create', (req, res, next) => createController(req, res, next))

app.get('/api/read', (req, res, next) => readController(req, res, next))

app.patch('/api/update', (req, res, next) => updateController(req, res, next))

app.delete('/api/delete', (req, res, next) => deleteController(req, res, next))

app.use((req, res) => {
  logger(`incoming ${req.method} request from ${req.hostname} ${req.ip} FULFILLED`)
})