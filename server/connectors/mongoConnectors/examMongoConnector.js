// Read this:
// https://mongoosejs.com/docs/api/model.html
const { mongoose, Schema } = require('mongoose')
const isEqual = require('fast-deep-equal')


const { connString, dbName } = require('./dbDetails.js')
const { examSchemaBody, submissionSchemaBody } = require('./dbSchemaBodies.js')
const { onFail, onSuccess } = require('./connectorHelpers.js')


const examSchema = new Schema(examSchemaBody, { collection: 'exams' })
const ExamModel = mongoose.model('ExamModel', examSchema)
const submissionSchema = new Schema(submissionSchemaBody, { collection: 'submissions' })
const SubmissionModel = mongoose.model('SubmissionModel', submissionSchema)
let isConnected = false


const connect = async () => {
  const action = `connecting to database '${dbName}'`
  if (isConnected === true) {
    return
  }
  try {
    await mongoose.connect(`${connString}/${dbName}`)
    isConnected = true
    onSuccess(action)
  }
  catch (err) {
    isConnected = false
    onFail(action)
    throw err
  }
}

const docExists = async (id = null) => {
  const action = `checking existence of doc: '${id}'`
  try {
    await connect()
    let res = (await ExamModel.findOne({ _id: id }) != null)
    onSuccess(action)
    return res
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const insertMany = async (docs = [], type = null) => {
  const action = `inserting docs`
  try {
    await connect()
    // docs.forEach((doc) => {
    //   if (!isEqual(doc, examObject)) {
    //     console.err(`doc ${doc} is not of the correct schema`)
    //     throw err
    //   }
    // })
    if (type === 'exam') {
      await ExamModel.insertMany(docs)
    }
    else if (type === 'submission') {
      await SubmissionModel.insertMany(docs)
    }
    else {
      throw 'invalid schema passed as \'type\' param'
    }
    onSuccess(action)
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const fetchById = async (id = null) => {
  const action = `fetching doc: ${id}`
  try {
    await connect()
    const res = await ExamModel.findById(id).exec()
    onSuccess(action)
    return res
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const fetchByFilter = async (filterObj = {}) => {
  const action = `fetching all docs by filter: ${filterObj}`
  try {
    await connect()
    const res = await ExamModel.find(filterObj).exec()
    onSuccess(action)
    return res
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const updateById = async (id = null, updateObj = {}) => {
  const action = `updating doc: ${id}`
  try {
    if (! await docExists(id)) {
      console.error(`doc ${id} does not exist`)
      return
    }
    await connect()
    await ExamModel.findByIdAndUpdate(id, updateObj) // is equivalent to findOneAndUpdate({ _id: id }, ...)
    onSuccess(action)
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const updateByFilter = async (filterObj = {}, updateObj = {}) => {
  const action = `updating docs`
  // EXAMPLE: updateObj = { $set: { key: newval } }
  try {
    await connect()
    await ExamModel.updateMany(filterObj, updateObj)
    onSuccess(action)
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const deleteById = async (id = null) => {
  const action = `deleting doc: ${id}`
  try {
    if (! await docExists(id)) {
      console.error(`doc ${id} does not exist`)
      return
    }
    await connect()
    const filterObj = { _id: id }
    await ExamModel.findOneAndDelete(filterObj, doc)
    onSuccess(action)
  }
  catch (err) {
    onFail(action)
    throw err
  }
}

const deleteByFilter = async (filterObj = {}) => {
  const action = `deleting all docs with filter: ${filterObj}`
  try {
    await connect()
    await ExamModel.deleteMany(filterObj)
    onSuccess(action)
  }
  catch (err) {
    onFail(action)
    throw err
  }
}


module.exports = {
  insertMany,
  fetchById,
  fetchByFilter,
  updateById,
  updateByFilter,
  deleteById,
  deleteByFilter
}