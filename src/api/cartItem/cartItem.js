const uuid = require("uuid").v4
const utils = require("../../utils/response")
const errorCodes = require("../../errorCodes")

const addCartItem = async (context, data) => {
    const { db } = context

    const cartItem = createCartItem(data)
    const resp = await db.cartItem.create(cartItem)

    // TODO: check response here...

    return utils.createResp({ type: "cartItem", ...resp.dataValues }, 201)
}

const createCartItem = (data) => {
    return {
        id: uuid(),
        quantity: data.quantity,
        productId: data.productId,
        cartId: data.cartId,
    }
}

const removeCartItem = async (context, data) => {
    const { db } = context
    const { cartId, cartItemId } = data

    const resp = await db.cartItem.destroy({
        where: { id: cartItemId, cartId: cartId },
    })

    const recordNumAffected = resp

    if (recordNumAffected === 1) {
        return {
            body: {},
            status: 200,
        }
    } else if (recordNumAffected === 0) {
        console.error("Cart item not found:", resp)
        return utils.createErrorResp(
            [
                {
                    message: "Cart item not found",
                    code: errorCodes.CART_ITEM_NOT_FOUND,
                },
            ],
            400
        )
    } else {
        console.error("Unexpected response from database:", resp)
        return utils.createInternalServerError()
    }
}

const updateCartItem = async (context, data) => {
    const { db } = context
    const { cartId, cartItemId, quantity } = data

    const resp = await db.cartItem.update(
        { quantity },
        {
            where: { id: cartItemId, cartId: cartId },
        }
    )

    const recordNumAffected = resp[0]

    if (recordNumAffected === 1) {
        return utils.createEmptyResp(200)
    } else if (recordNumAffected === 0) {
        console.error("Cart item not found:", resp)
        return utils.createErrorResp(
            [
                {
                    message: "Cart item not found",
                    code: errorCodes.CART_ITEM_NOT_FOUND,
                },
            ],
            400
        )
    } else {
        console.error("Unexpected response from database:", resp)
        return utils.createInternalServerError()
    }
}

module.exports = {
    addCartItem,
    removeCartItem,
    updateCartItem,
}
