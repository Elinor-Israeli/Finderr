const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const logger = require('./logger.service')

const dbService = {
    getCollection
}

module.exports = dbService

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await _connect()

        const collection = await db.collection(collectionName)
        

        return collection
    } catch (err) {
        console.log('had troubels connectiong on get');

        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn

    try {
        console.log(config)
        const client = await MongoClient.connect(config.dbURL)
        return dbConn = client.db(config.dbName)
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}



