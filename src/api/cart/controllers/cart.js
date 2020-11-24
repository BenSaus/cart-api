const uuid = require("uuid").v4
const utils = require("../../../utils/response")

const createCart = async (context) => {
    const { db } = context

    const resp = await db.cart.create({
        id: uuid(),
    })

    return utils.createResp(resp.dataValues, 201)
}

const getCart = async (context, cartId) => {
    const { db } = context

    // TODO: Could use a Promise.all here....
    const respCart = await db.cart.findOne({ where: { id: cartId } })
    const respItems = await db.cartItem.findAll({ where: { cartId: cartId } })

    // TODO: Is this and needed??
    if (respCart !== null && typeof respCart.dataValues !== "undefined") {
        const items = respItems.map((item) => {
            return {
                type: "cartItem",
                id: item.dataValues.id,
                quantity: item.dataValues.quantity,
                productId: item.dataValues.productId,
            }
        })
        const responseData = { type: "cart", ...respCart.dataValues, items }

        return utils.createResp(responseData, 200)
    } else if (respCart === null) {
        return utils.createErrorResp(
            { message: "Cart item not found", code: 4000 },
            400
        )
    } else {
        return utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }
}

module.exports = {
    createCart,
    getCart,
}
