const express = require('express')
const { addOrder, getOrders, updateOrder } = require('./order.controller')
const router = express.Router()

router.get('/', getOrders)
router.post('/', addOrder)
router.put('/:id', updateOrder)

module.exports = router