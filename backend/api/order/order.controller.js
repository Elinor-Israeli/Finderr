const logger = require('../../services/logger.service')
const orderService = require('./order.service')
const socketService = require('../../services/socket.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query()
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    try {
        // const { loggedinUser } = asyncLocalStorage.getStore()

        var order = req.body
        order = await orderService.add(order)
        res.send(order)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        // const { loggedinUser } = asyncLocalStorage.getStore()

        const order = req.body
        const updatedOrder = await orderService.update(order)
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })

    }
}

module.exports = {
    getOrders,
    updateOrder,
    addOrder
}