const { body, param, validationResult } = require("express-validator")
const constants = require("../../constants")

const getCartValidationRules = () => {
    return [param("id", "Invalid cart id").exists().isUUID()]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    res.status(422).json({ errors: errors.array() })
}

module.exports = {
    getCartValidationRules,
    validate,
}
