module.exports = (sequelize, dataTypes) => {

    let alias = "images";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        file: {
            type: dataTypes.STRING,
            allowNull: true,
            
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: true
        }


    }

    let config = {
        tableName: "images",
        timestamps: true
        

    }

    const images = sequelize.define(alias, cols, config);

    images.associate = function (models) {
        images.belongsTo(models.products, {
            as: "imagen",
            foreignKey: "productId"
            

        })
    

    }
    return images;
}