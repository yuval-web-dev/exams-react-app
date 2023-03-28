const { mongoose, Schema } = require('mongoose')

const consts = require('./consts.js')
const dbObjects = require('./dbObjects.js')

let = dbSchemas.examSchema

const examSchema = new Schema(dbObjects.examObject, { collection: 'exams' })
