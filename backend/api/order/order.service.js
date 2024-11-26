const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function query() {
    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find().toArray()
        return orders

    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function update(order) {
    try {
        const orderToSave = {
            status: order.status
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(order._id) }, { $set: orderToSave })
        return order
    } catch (err) {
        logger.error(`cannot update gig ${order._id}`, err)
        throw err
    }
}

module.exports = {
    query,
    update,
    add
}