module.exports = (sequelize, dataTypes) => {

    let alias = "sections";
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
        tableName: "sections",
        timestamps: false
        

    }

    const sections = sequelize.define(alias, cols, config);

    sections.associate = function (models) {
        sections.hasMany(models.products, {
            as: "products",
            foreignKey: "sectionId"
            

        })
    

    }
    return sections;
}