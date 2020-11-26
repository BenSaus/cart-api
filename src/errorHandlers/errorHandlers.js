const error404 = function (req, res, next) {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
}

const errorResponse = function (err, req, res, next) {
    // TODO: Use logger here instead!!
    console.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
        } - ${req.ip}`
    )
    res.status(err.status).send()
}

module.exports = {
    error404,
    errorResponse,
}
