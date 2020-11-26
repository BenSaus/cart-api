"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class cartItem extends Model {
        static associate(models) {
            cartItem.belongsTo(models.cart, {
                foreignKey: { allowNull: false },
            })
        }
    }
    cartItem.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            // Product Id is just a string for ease of testing, it would be a UUID in a production system
            productId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "cartItem",
        }
    )
    return cartItem
}
