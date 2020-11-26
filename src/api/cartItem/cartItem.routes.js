const db = require("../../database/models")
const controller = require("./cartItem")
const {
    addCartItemValidationRules,
    deleteItemValidationRules,
    updateItemValidationRules,
    validate,
} = require("./validator")
const express = require("express")
const router = express.Router()
const utils = require("../../utils/response")

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
    addCartItemValidationRules(),
    validate,
    async (req, res) => {
        let resp
        try {
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
    deleteItemValidationRules(),
    validate,
    async (req, res) => {
        let resp
        try {
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
    updateItemValidationRules(),
    validate,
    async (req, res) => {
        let resp
        try {
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
