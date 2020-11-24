const uuid = require("uuid").v4
const utils = require("../../../utils/response")

const addCartItem = async (context, data) => {
    const { db } = context
    console.log("Adding cart Item", data)

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
    console.log("Removing cart Item", data)

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
        // TODO: Log problem here
        return utils.createErrorResp(
            { message: "Cart item not found", code: 4000 },
            400
        )
    } else {
        // TODO: Log problem here
        return utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }
}

const updateCartItem = async (context, data) => {
    const { db } = context
    console.log("Updating cart Item", data)

    const { cartId, cartItemId, quantity } = data

    const resp = await db.cartItem.update(
        { quantity },
        {
            where: { id: cartItemId, cartId: cartId },
        }
    )

    const recordNumAffected = resp[0]
    console.log(recordNumAffected)

    if (recordNumAffected === 1) {
        return utils.createEmptyResp(200)
    } else if (recordNumAffected === 0) {
        // TODO: Log problem here
        return utils.createErrorResp(
            { message: "Cart item not found", code: 4000 },
            400
        )
    } else {
        // TODO: Log problem here
        return utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }
}

module.exports = {
    addCartItem,
    removeCartItem,
    updateCartItem,
}
