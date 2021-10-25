module.exports = (sequelize, dataTypes) => {

    let alias = "categories";
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
        tableName: "categories",
        timestamps: false
        

    }

    const categories = sequelize.define(alias, cols, config);

    categories.associate = function (models) {
        categories.hasMany(models.products, {
            as: "category",
            foreignKey: "categoryId"
            

        })
    

    }
    return categories;
}