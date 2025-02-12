const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

async function query(role, userId) {
    try {
        const collection = await dbService.getCollection('order')
        let filter = {}
        if (role === 'seller') {
            filter = { 'seller._id': userId }
        } else if (role === 'buyer') {
            filter = { 'buyer._id': userId }
        }
        const orders = await collection.find(filter).toArray()
        return orders
    } catch (err) {
        logger.error('Cannot find orders', err)
        throw err;
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
        logger.error(`cannot update order ${order._id}`, err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`cannot find order ${orderId}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    update,
    add
}