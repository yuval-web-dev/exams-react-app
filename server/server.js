const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: './dotenv/.env' })

const { createController, readController, updateController, deleteController } = require('./controllers/index.js')
const { logger } = require('./helpers.js')



const server = express()
const port = 3001

server.use(express.json())
server.use(cors())

server.listen(port, logger(`server started and listening on port ${port}`))

server.use((req, res, next) => {
  logger(`incoming ${req.method} request from ${req.hostname}:${req.ip} RECEIVED`)
  next(req, res, next)
})

server.post('/api/create', (req, res, next) => createController(req, res, next))

server.get('/api/read', (req, res, next) => readController(req, res, next))

server.patch('/api/update', (req, res, next) => updateController(req, res, next))

server.delete('/api/delete', (req, res, next) => deleteController(req, res, next))

server.use((req, res) => {
  logger(`incoming ${req.method} request from ${req.hostname} ${req.ip} FULFILLED`)
})