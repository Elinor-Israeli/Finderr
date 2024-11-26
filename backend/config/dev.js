module.exports = {
  // dbURL: 'mongodb://127.0.0.1:27017',
  dbURL: process.env.DB_KEY,

  dbName: process.env.DB_KEY_COLLECTION
  // dbName: 'gig_db'
}
