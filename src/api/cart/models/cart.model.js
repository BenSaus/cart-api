module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define(
        "cart",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            // underscored: true,
            timestamps: true,
        }
    )

    return cart
}
