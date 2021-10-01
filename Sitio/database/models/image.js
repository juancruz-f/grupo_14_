module.exports = (sequelize, dataTypes) => {

    let alias = "images";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
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
            as: "products",
            foreignKey: "imagenId"
            

        })
    

    }
    return images;
}