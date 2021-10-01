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
        imageId:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        sectionId:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        origenId:{
            type: dataTypes.INTEGER,
            allowNull: true

        },
        categoryId:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "products"
       
       

    }

    const products = sequelize.define(alias, cols, config);

    products.associate = function (models) {
        products.belongsTo(models.categories, {
            as: "category",
            foreignKey: "categoryId"

        })};
    products.associate = function (models) {
            products.belongsTo(models.sections, {
                as: "section",
                foreignKey: "sectionId"
    
            })};
    products.associate = function (models) {
                products.belongsTo(models.origenes, {
                    as: "origen",
                    foreignKey: "origenId"
        
                })};        

    products.associate = function (models) {
            products.hasMany(models.images, {
                as: "imagen",
                foreignKey: "imagenId"
    
            });
    

    }
    return users;
}