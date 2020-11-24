module.exports = (sequelize, DataTypes) => {
    const cartItem = sequelize.define(
        "cartItem",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // underscored: true,
            timestamps: true,
        }
    )

    cartItem.associate = function (models) {
        cartItem.belongsTo(models.cart, { foreignKey: { allowNull: false } })
    }

    return cartItem
}
