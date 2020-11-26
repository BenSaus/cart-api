const db = require("../../database/models")
const controller = require("./cartItem")
const express = require("express")
const router = express.Router()
const { param, body, validationResult } = require("express-validator")
const utils = require("../../utils/response")
const constants = require("../../constants")

/**
 * @api {post} /v1/carts/:id/items Add Cart Item
 * @apiName AddCartItem
 * @apiPermission public
 * @apiGroup Cart
 *
 * @apiParam  {String} id Cart Id
 *
 * @apiSuccess (201) {Object} mixed `cartItem` object
 */
router.post(
    "/:id/items",
    [
        param("id", "Invalid cart id").exists().isUUID(),
        body("data", "Data object required").exists(),
        body("data.productId", "Product id required").exists(),
        body("data.quantity", "Invalid item quantity").exists().isInt({
            min: constants.MIN_CART_QUANTITY,
            max: constants.MAX_CART_QUANTITY,
        }),
    ],
    async (req, res) => {
        let resp
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // TODO: Use logger here instead
                console.log(errors)
                res.status(422).json({ errors: errors.array() })
                return
            }

            resp = await controller.addCartItem(
                { db },
                { ...req.body.data, cartId: req.params.id }
            )
        } catch (error) {
            // TODO: Use logger here instead
            console.error(error)
            resp = utils.createInternalServerError()
        }

        res.status(resp.status)
        res.send(resp.body)
    }
)

/**
 * @api {delete} /v1/carts/:id/items/:cartItemId Remove Cart Item
 * @apiName RemoveCartItem
 * @apiPermission public
 * @apiGroup Cart
 *
 * @apiParam  {String} id Cart Id
 * @apiParam  {String} cartItemId Cart item Id
 *
 * @apiSuccess (200) {}
 */
router.delete(
    "/:id/items/:cartItemId",
    [
        param("id", "Invalid cart id").exists().isUUID(),
        param("cartItemId", "Invalid cart item id").exists().isUUID(),
    ],
    async (req, res) => {
        let resp
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // TODO: Use logger here instead
                console.log(errors)
                res.status(422).json({ errors: errors.array() })
                return
            }

            resp = await controller.removeCartItem(
                { db },
                { cartItemId: req.params.cartItemId, cartId: req.params.id }
            )
        } catch (error) {
            // TODO: Use logger here instead
            console.error(error)
            resp = utils.createInternalServerError()
        }

        res.status(resp.status)
        res.send(resp.body)
    }
)

/**
 * @api {put} /v1/carts/:id/items/:cartItemId Update Cart Item
 * @apiName UpdateCartItem
 * @apiPermission public
 * @apiGroup Cart
 *
 * @apiParam  {String} id Cart Id
 * @apiParam  {String} cartItemId Cart item Id
 *
 * @apiSuccess (200) {}
 */
router.put(
    "/:id/items/:cartItemId",
    [
        param("id", "Invalid cart id").exists().isUUID(),
        param("cartItemId", "Invalid cart item id").exists().isUUID(),
        body("data", "Data object required").exists(),
        body("data.quantity", "Invalid item quantity").exists().isInt({
            min: constants.MIN_CART_QUANTITY,
            max: constants.MAX_CART_QUANTITY,
        }),
    ],
    async (req, res) => {
        let resp
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // TODO: Use logger here instead
                console.log(errors)
                res.status(422).json({ errors: errors.array() })
                return
            }
            resp = await controller.updateCartItem(
                { db },
                {
                    cartItemId: req.params.cartItemId,
                    cartId: req.params.id,
                    quantity: req.body.data.quantity,
                }
            )
        } catch (error) {
            // TODO: Use logger here instead
            console.error(error)
            resp = utils.createInternalServerError()
        }

        res.status(resp.status)
        res.send(resp.body)
    }
)

module.exports = router
