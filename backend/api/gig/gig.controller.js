const gigService = require('./gig.service.js')

const logger = require('../../services/logger.service')

async function getGigs(req, res) {
  const { filterBy } = JSON.parse(req.query.params)
  const { sortBy } = JSON.parse(req.query.params)
  const { userId } = JSON.parse(req.query.params)
  try {
    logger.debug('Getting Gigs')
    const gigs = await gigService.query(filterBy, sortBy, userId)
    res.json(gigs)
  } catch (err) {
    logger.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

async function getGigById(req, res) {
  try {
    const gigId = req.params.id
    const gig = await gigService.getById(gigId)
    res.json(gig)
  } catch (err) {
    logger.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

async function addGig(req, res) {
  const { loggedinUser } = req
  try {
    const gig = req.body
    const addedGig = await gigService.add(gig)
    res.json(addedGig)
  } catch (err) {
    logger.error('Failed to add gig', err)
    res.status(500).send({ err: 'Failed to add gig' })
  }
}

async function updateGig(req, res) {
  try {
    const gig = req.body
    const updatedGig = await gigService.update(gig)
    res.json(updatedGig)
  } catch (err) {
    logger.error('Failed to update gig', err)
    res.status(500).send({ err: 'Failed to update gig' })
  }
}

async function removeGig(req, res) {
  try {
    const gigId = req.params.id
    const removedId = await gigService.remove(gigId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove gig', err)
    res.status(500).send({ err: 'Failed to remove gig' })
  }
}

// async function addGigMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const gigId = req.params.id
//     const msg = {
//       txt: req.body.txt,
//       by: loggedinUser
//     }
//     const savedMsg = await gigService.addGigMsg(gigId, msg)
//     res.json(savedMsg)
//   } catch (err) {
//     logger.error('Failed to update gig', err)
//     res.status(500).send({ err: 'Failed to update gig' })

//   }
// }

// async function removeGigMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const gigId = req.params.id
//     const {msgId} = req.params

//     const removedId = await gigService.removeGigMsg(gigId, msgId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove gig msg', err)
//     res.status(500).send({ err: 'Failed to remove gig msg' })

//   }
// }

module.exports = {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
  // addGigMsg,
  // removeGigMsg
}
