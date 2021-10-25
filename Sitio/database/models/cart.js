module.exports = (sequelize, dataTypes) => {

    let alias = "carts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false,
            unique: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false,
            unique: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    }

    let config = {
        tableName: "carts",
        timestamps: false
      

    }

    const carts = sequelize.define(alias, cols, config);

    carts.associate = function (models) {
        /* carts.hasMany(models.products, {
            as: "products",
            foreignKey: "productId",
        }) */
        /* carts.hasMany(models.users, {
            as: "users",
            foreignKey: "userId",
        }) */


    }
    return carts;
}