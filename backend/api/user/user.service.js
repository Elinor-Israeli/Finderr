const { log } = require('console')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUsername,
    update,
    add,
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password        
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

// async function update(user) {
//     try {
//         const userToSave = {
//             _id: ObjectId(user._id),
//             imgUrl: user.imgUrl,
//             aboutMe: user.aboutMe,
//             wishList: user.wishList
//         }
//         const collection = await dbService.getCollection('user')
//         await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
//         console.log('userToSave', userToSave);
        
//         return userToSave
//     } catch (err) {
//         logger.error(`cannot update user ${user._id}`, err)
//         throw err
//     }
// }

async function update(user) {
    try {
        const collection = await dbService.getCollection('user')
        const userId = ObjectId(user._id)

        const updates = {
            imgUrl: user.imgUrl,
            aboutMe: user.aboutMe,
            wishList: user.wishList,
        }

        await collection.updateOne({ _id: userId }, { $set: updates })
        const updatedUser = await collection.findOne({ _id: userId })
console.log('updatedUser', updatedUser);

        return updatedUser
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}


async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            aboutMe:'Helping entrepreneurs build scalable digital products',
            imgUrl: user.imgUrl,
            level: '2',
            wishList: user.wishList

        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

