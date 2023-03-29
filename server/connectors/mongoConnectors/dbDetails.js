const connString = 'mongodb://127.0.0.1:27017'
const dbName = 'etestDB'
const dbCollections = {
  exams: 'exams',
  submissions: 'submissions'
}

module.exports = {
  connString,
  dbName,
  dbCollections
}