const db = require("../../database/models")
const controller = require("./cart")
const express = require("express")
const utils = require("../../utils/response")
const router = express.Router()
const { getCartValidationRules, validate } = require("./cart.validator")

/**
 * @api {post} /v1/carts Get new cart
 * @apiName GetCart
 * @apiPermission public
 * @apiGroup Cart
 *
 * @apiSuccess (201) {Object} `Cart` object
 */
router.post("/", async (req, res) => {
    let resp
    try {
        resp = await controller.createCart({ db })
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createInternalServerError()
    }
    res.status(resp.status)
    res.send(resp.body)
})

/**
 * @api {get} /v1/carts/:id Get cart
 * @apiName GetCart
 * @apiPermission public
 * @apiGroup Cart
 *
 * @apiParam  {String} id Cart Id
 *
 * @apiSuccess (200) {Object} mixed `Cart` object
 */
router.get("/:id", getCartValidationRules(), validate, async (req, res) => {
    let resp
    try {
        resp = await controller.getCart({ db }, req.params.id)
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createInternalServerError()
    }

    res.status(resp.status)
    res.send(resp.body)
})

module.exports = router
