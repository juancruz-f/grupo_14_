module.exports = (sequelize, dataTypes) => {

    let alias = "products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,

        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,

        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        sectionId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        origenId: {
            type: dataTypes.INTEGER,
            allowNull: true

        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "products",
        timestamps: true
        
    }

    const products = sequelize.define(alias, cols, config);

    products.associate = function (models) {
        products.belongsTo(models.categories, {
            as: "category",
            foreignKey: "id",
            where:"categoria"

        })
        products.belongsTo(models.sections, {
            as: "section",
            foreignKey: "id"

        })
        products.belongsTo(models.origenes, {
            as: "origen",
            foreignKey: "id"

        })
        products.hasMany(models.images, {
            as: "imagen",
            foreignKey: "id"

        });
        products.hasMany(models.carts, {
            as: "products",
            foreignKey: "id"

        })

    };

    return products;
}