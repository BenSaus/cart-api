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

    it("Check new cart is in db", async () => {
        const res = await request(app).post(`/${constants.VERSION}/carts`)

        // TODO: Check it's in db here....
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

    afterAll(async () => {
        await thisDb.sequelize.close()
    })
})
