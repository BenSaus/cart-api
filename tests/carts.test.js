const request = require("supertest")
const app = require("../src/app")
const constants = require("../src/constants")
const db = require("../src/database/models")

describe("Cart", () => {
    let thisDb = db

    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true })
    })

    it("Get new cart", async () => {
        const res = await request(app)
            .post(`/${constants.VERSION}/carts`)
            .set("Accept", "application/json")
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("id")
    })

    it("Get empty cart", async () => {
        const createCartRes = await request(app).post(
            `/${constants.VERSION}/carts`
        )
        const id = createCartRes.body.data.id

        const getCartRes = await request(app)
            .get(`/${constants.VERSION}/carts/${id}`)
            .set("Accept", "application/json")
        expect(getCartRes.statusCode).toEqual(200)
        expect(getCartRes.body).toHaveProperty("data")
        expect(getCartRes.body.data.type).toEqual("cart")
        expect(getCartRes.body.data.items.length).toEqual(0)
    })

    it("Get Cart, not found", async () => {
        const dummyCartId = "07a93fe1-bd5b-4feb-b82b-8d2d718ab1f4"

        const getCartRes = await request(app)
            .get(`/${constants.VERSION}/carts/${dummyCartId}`)
            .set("Accept", "application/json")
        expect(getCartRes.statusCode).toEqual(400)
        expect(getCartRes.body).toHaveProperty("errors")
    })

    afterAll(async () => {
        await thisDb.sequelize.close()
    })
})
