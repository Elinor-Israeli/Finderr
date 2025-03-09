function log(req, res, next) {
    console.log(`Request received: ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
}

module.exports = { log };
