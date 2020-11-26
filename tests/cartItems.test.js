const request = require("supertest")
const app = require("../src/app")
const constants = require("../src/constants")
const db = require("../src/database/models")

describe("CartItems", () => {
    let thisDb = db

    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true })
    })

    const createCart = async () => {
        const createCartRes = await request(app).post(
            `/${constants.VERSION}/carts`
        )
        return createCartRes.body.data.id
    }
    const createCartAndItem = async () => {
        const cartId = await createCart()

        const body = {
            data: {
                productId: "123",
                quantity: 12,
            },
        }

        const addItemResp = await request(app)
            .post(`/${constants.VERSION}/carts/${cartId}/items`)
            .set("Accept", "application/json")
            .send(body)

        const cartItemId = addItemResp.body.data.id

        return { cartId, cartItemId }
    }

    it("Add Cart Item", async () => {
        const cartId = await createCart()

        const body = {
            data: {
                productId: "123",
                quantity: 12,
            },
        }

        const res = await request(app)
            .post(`/${constants.VERSION}/carts/${cartId}/items`)
            .set("Accept", "application/json")
            .send(body)

        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("id")
        expect(res.body.data).toHaveProperty("type")
        expect(res.body.data.type).toEqual("cartItem")
    })

    it("Update cart item quantity", async () => {
        const { cartId, cartItemId } = await createCartAndItem()

        const body = {
            data: {
                quantity: 3,
            },
        }

        const res = await request(app)
            .put(`/${constants.VERSION}/carts/${cartId}/items/${cartItemId}`)
            .set("Accept", "application/json")
            .send(body)

        expect(res.statusCode).toEqual(200)
    })

    it("Update cart item, not found error", async () => {
        const cartId = await createCart()
        const dummyUUID = "f28ea152-1389-483e-acb7-2b130620ee7c"

        const body = {
            data: {
                quantity: 3,
            },
        }

        const res = await request(app)
            .put(`/${constants.VERSION}/carts/${cartId}/items/${dummyUUID}`)
            .set("Accept", "application/json")
            .send(body)

        expect(res.statusCode).toEqual(400)
    })

    it("Remove cart item", async () => {
        const { cartId, cartItemId } = await createCartAndItem()

        const res = await request(app)
            .delete(`/${constants.VERSION}/carts/${cartId}/items/${cartItemId}`)
            .set("Accept", "application/json")

        expect(res.statusCode).toEqual(200)
    })

    afterAll(async () => {
        await thisDb.sequelize.close()
    })
})
