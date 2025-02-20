const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('gig_db')
        var gigs = await collection.find(criteria).toArray()
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.categories) {
        criteria.tags = { $in: filterBy.categories }
    }

    if (filterBy.minPrice != 0 || filterBy.maxPrice != Infinity) {

        criteria = {
            ...criteria,
            "$and": [
                { price: { $gte: filterBy.minPrice } },
                { price: { $lte: filterBy.maxPrice } }
            ]
        }
    }

    if (filterBy.daysToMake) {
        criteria.daysToMake = { $lte: +filterBy.daysToMake || Infinity }
    }
    if (filterBy.userId) {
        criteria.owner_id = filterBy.userId
    }

    return criteria

}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig_db')
        const gig = collection.findOne({ _id: ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`cannot find gig ${gigId}`, err)
        throw err
    }
}
async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig_db')
        await collection.deleteOne({ _id: ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const collection = await dbService.getCollection('gig_db')
        await collection.insertOne(gig)
        return gig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        const gigToSave = {
            price: gig.price,
            title: gig.title,
            description: gig.description,
            tags: gig.tags,
            daysToMake: gig.daysToMake,
            imgUrl: gig.imgUrl,
            wishList: gig.wishList,
        }
        const collection = await dbService.getCollection('gig_db')
        await collection.updateOne({ _id: ObjectId(gig._id) }, { $set: gigToSave })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gig._id}`, err)
        throw err
    }

}
async function addMsgToChat(msg, gigId) {
    try {
        console.log('gigId', gigId);
        const collection = await dbService.getCollection('gig_db')
        await collection.updateOne({ '_id': ObjectId(gigId) }, { $push: { chat: msg } })
    } catch (err) {
        console.log(`ERROR: cannot add message to gig`)
        throw err;
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}