module.exports = (sequelize, dataTypes) => {

    let alias = "roles";
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
        tableName: "roles",
        timestamps: false,
        underscored: true

    }

    const roles = sequelize.define(alias, cols, config);

    roles.associate = function (models) {
        roles.hasMany(models.users, {
            as: "users",
            foreignKey: "rolId"
            

        })
    

    }
    return roles;
}