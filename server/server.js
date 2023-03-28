const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: './dotenv/.env' })

const { logger } = require('./serverFuncs.js')

const server = express()
const port = 3001

server.use(express.json())
server.use(cors())

server.listen(port, logger(`server started and listening on port ${port}`))

server.use((req, res, next) => {
  logger(`incoming ${req.method} request from ${req.hostname}:${req.ip} RECEIVED`)
  next()
})

// server.post('/api/create', (req, res, next) => {
//   try {
//     const { createdExamJson } = req.body
//     // TODO:
//     // Use the mongoConnector here
//     // ...
//     logger(`request fulfilled from ${req.hostname}:${req.ip}`)
//     return res
//       .json({ body: 'create api response' })
//       .status(500)
//       .end()
//   }
//   catch (err) {
//     console.error(err)
//     logger(`request fulfilled from ${req.hostname}:${req.ip}`)
//     return res
//       .json({ body: 'ok' })
//       .status(500)
//       .end()
//   }
// })

server.get('/api/read', (req, res, next) => {
  try {
    // const { requestedFilter } = req.body
    // TODO:
    // Use the mongoConnector here
    // ...
    res.json({ body: `/api/read response` }).status(500).end()
  }
  catch (err) {
    console.error(err)
    return res.status(500).end()
  }
  next()
})

// server.patch('/api/update', (req, res, next) => {
//   try {
//     const { updatedExamJson } = req.body
//     // TODO:
//     // Use the mongoConnector here
//     // ...
//     return res
//       .json({ body: 'update api response' })
//       .status(500)
//       .end()
//   }
//   catch (err) {
//     console.error(err)
//     return res.status(500).end()
//   }
// })

// server.delete('/api/delete', (req, res, next) => {
//   try {
//     const { filterToDelete } = req.body
//     // TODO:
//     // Use the mongoConnector here
//     // ...
//     logger(`request fulfilled from ${req.hostname} ${req.ip}`)
//     res
//       .json({ body: 'delete api response' })
//       .status(500)
//       .end()
//   }
//   catch (err) {
//     console.error(err)
//     res.
//       status(500)
//       .end()
//   }
//   next()
// })

server.use((req, res) => {
  logger(`incoming ${req.method} request from ${req.hostname} ${req.ip} FULFILLED`)
})