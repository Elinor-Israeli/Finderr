const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        const userInfo = req.loggedinUser ? ` by user ${req.loggedinUser.fullname}` : ''
        logger.info(`User fetched successfully: ${user._id}${userInfo}`)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function updateUser(req, res) {
    if (!req.loggedinUser) {        
        return res.status(401).send({ err: 'Not user found' })
    }

    try {
        const user = req.body
        if (user._id !== req.loggedinUser._id) {
            return res.status(403).send({ err: 'You are not authorized to update this order' })
        }
        const savedUser = await userService.update(user)
        logger.info(`Updated user ${req.loggedinUser.fullname} information`)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getUser,
    updateUser
}