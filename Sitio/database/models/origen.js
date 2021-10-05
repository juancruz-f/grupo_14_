module.exports = (sequelize, dataTypes) => {

    let alias = "origenes";
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
            
        }


    }

    let config = {
        tableName: "origenes",
        timestamps: false
        

    }

    const origenes = sequelize.define(alias, cols, config);

    origenes.associate = function (models) {
        origenes.hasMany(models.products, {
            as: "products",
            foreignKey: "origenId"
            

        })
    

    }
    return origenes;
}