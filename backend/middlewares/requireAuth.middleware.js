const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')
const config = require('../config')
const asyncLocalStorage = require('../services/als.service')

function requireAuth(req, res, next) {
  // const { loggedinUser } = asyncLocalStorage.getStore()
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  console.log('now loggedinUser', loggedinUser)
  req.loggedinUser = loggedinUser

  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
}
