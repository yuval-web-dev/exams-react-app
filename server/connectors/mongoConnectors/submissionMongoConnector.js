// Read this:
// https://mongoosejs.com/docs/api/model.html

const { mongoose, Schema } = require('mongoose')
const isEqual = require('fast-deep-equal')

const { connString, dbName } = require('./dbDetails.js')
const { submissionObject } = require('./dbObjects.js')
const { onFail, onSuccess } = require('./connectorFuncs.js')

const submissionSchema = new Schema(submissionObject, { collection: 'submissions' })

const SubmissionModel = mongoose.model('ExamModel', submissionSchema)

let isConnected = false

// const connect = async () => {
//   const action = `connecting to database '${dbName}'`
//   if (isConnected === true) {
//     return
//   }
//   try {
//     await mongoose.connect(`${connString}/${dbName}`)
//     isConnected = true
//     onSuccess(action)
//   }
//   catch (err) {
//     isConnected = false
//     onFail(action)
//     throw err
//   }
// }

// const docExists = async (id = null) => {
//   const action = `checking existence of doc: '${id}'`
//   try {
//     await connect()
//     let res = (await ExamModel.findOne({ _id: id }) != null)
//     onSuccess(action)
//     return res
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const insertMany = async (docs = []) => {
//   const action = `inserting docs`
//   try {
//     await connect()
//     docs.forEach((doc) => {
//       if (!isEqual(doc, examObject)) {
//         console.err(`doc ${doc} is not of the correct schema`)
//         throw err
//       }
//     })
//     await ExamModel.insertMany(docs)
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const fetchById = async (id = null) => {
//   const action = `fetching doc: ${id}`
//   try {
//     await connect()
//     const res = await ExamModel.findById(id).exec()
//     onSuccess(action)
//     return res
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const fetchByFilter = async (filterObj = {}) => {
//   const action = `fetching all docs by filter: ${filterObj}`
//   try {
//     await connect()
//     const res = await ExamModel.find(filterObj).exec()
//     onSuccess(action)
//     return res
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const updateById = async (id = null, updateObj = {}) => {
//   const action = `updating doc: ${id}`
//   try {
//     if (! await docExists(id)) {
//       console.error(`doc ${id} does not exist`)
//       return
//     }
//     await connect()
//     await ExamModel.findByIdAndUpdate(id, updateObj) // is equivalent to findOneAndUpdate({ _id: id }, ...)
//     onSuccess(action)
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const updateByFilter = async (filterObj = {}, updateObj = {}) => {
//   const action = `updating docs`
//   // EXAMPLE: updateObj = { $set: { key: newval } }
//   try {
//     await connect()
//     await ExamModel.updateMany(filterObj, updateObj)
//     onSuccess(action)
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const deleteById = async (id = null) => {
//   const action = `deleting doc: ${id}`
//   try {
//     if (! await docExists(id)) {
//       console.error(`doc ${id} does not exist`)
//       return
//     }
//     await connect()
//     const filterObj = { _id: id }
//     await ExamModel.findOneAndDelete(filterObj, doc)
//     onSuccess(action)
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }

// export const deleteByFilter = async (filterObj = {}) => {
//   const action = `deleting all docs with filter: ${filterObj}`
//   try {
//     await connect()
//     await ExamModel.deleteMany(filterObj)
//     onSuccess(action)
//   }
//   catch (err) {
//     onFail(action)
//     throw err
//   }
// }