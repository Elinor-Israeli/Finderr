const logger = require('../../services/logger.service')
const orderService = require('./order.service')
const socketService = require('../../services/socket.service.js') 


async function getOrders(req, res) {
    if (!req.loggedinUser) {
        return res.status(401).send({ err: 'User not found' })   
    }

    try {
        const userId = req.loggedinUser._id
        const role = req.query.role
        if (role !=='buyer' && role !== 'seller') {
           return res.status(400).send({ err: 'Role is not valid' })
        }
        const orders = await orderService.query(role,userId)
        logger.info(`Got orders of ${req.loggedinUser.fullname}`)
        return res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        return res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    if (!req.loggedinUser) {
        return res.status(401).send({ err: 'User not found' })
    }
    try {
        var order = req.body
        if (order.buyer._id !== req.loggedinUser._id){
            return res.status(403).send({ err: 'You are not authorized to add this order' }) 
        }
        order = await orderService.add(order)
        logger.info(`${req.loggedinUser.fullname} added order  ${order._id} successfully`)
        logger.info(`userId to send emitToUser to ${order.seller._id}`)
        socketService.emitToUser({ type: 'order-added', data: order, userId: order.seller._id })
        res.send(order)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    if (!req.loggedinUser) {
        return res.status(401).send({ err: 'User not found' })
    }
    try {
        const order = req.body
        const orderDb = await orderService.getById(order._id)
     
        if (req.loggedinUser._id !== orderDb.seller._id) {
            return res.status(403).send({ err: 'You are not authorized to update this order' })
        }
        const updatedOrder = await orderService.update(order)
        logger.info(`Update order ${order._id} of ${req.loggedinUser.fullname}`)
        socketService.emitToUser({ type: 'order-updated', data: order, userId: order.seller._id })
        socketService.emitToUser({ type: 'order-updated', data: order, userId: order.buyer._id })


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