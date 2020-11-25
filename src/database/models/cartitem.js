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
