const { body, param, validationResult } = require("express-validator")
const constants = require("../../constants")

const addCartItemValidationRules = () => {
    return [
        param("id", "Invalid cart id").exists().isUUID(),
        body("data", "Data object required").exists(),
        body("data.productId", "Product id required").exists(),
        body("data.quantity", "Invalid item quantity").exists().isInt({
            min: constants.MIN_CART_QUANTITY,
            max: constants.MAX_CART_QUANTITY,
        }),
    ]
}

const deleteItemValidationRules = () => {
    return [
        param("id", "Invalid cart id").exists().isUUID(),
        param("cartItemId", "Invalid cart item id").exists().isUUID(),
    ]
}

const updateItemValidationRules = () => {
    return [
        param("id", "Invalid cart id").exists().isUUID(),
        param("cartItemId", "Invalid cart item id").exists().isUUID(),
        body("data", "Data object required").exists(),
        body("data.quantity", "Invalid item quantity").exists().isInt({
            min: constants.MIN_CART_QUANTITY,
            max: constants.MAX_CART_QUANTITY,
        }),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    res.status(422).json({ errors: errors.array() })
}

module.exports = {
    addCartItemValidationRules,
    deleteItemValidationRules,
    updateItemValidationRules,
    validate,
}
