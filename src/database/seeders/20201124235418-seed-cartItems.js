"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("cartItems", [
            {
                id: "95bc510b-4e2f-47c6-917c-c343e3b744d9",
                productId: "111",
                quantity: 22,
                cartId: "95bc510b-4e2f-47c6-917c-c343e3b744d9",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "d8e5df6c-642f-45ae-b9a7-637e92da5877",
                productId: "123",
                quantity: 3,
                cartId: "95bc510b-4e2f-47c6-917c-c343e3b744d9",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "5b01623c-6873-42c3-873b-ab8f3c8b0433",
                productId: "321",
                quantity: 6,
                cartId: "d8e5df6c-642f-45ae-b9a7-637e92da5877",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("cartItems", null, {})
    },
}
