"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class cart extends Model {
        static associate(models) {}
    }
    cart.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "cart",
        }
    )
    return cart
}
