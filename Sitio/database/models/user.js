module.exports = (sequelize, dataTypes) => {

    let alias = "users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false,
            
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false,
           
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: true
        },
        rolId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        }


    }

    let config = {
        tableName: "users"
       
       

    }

    const users = sequelize.define(alias, cols, config);

    users.associate = function (models) {
        users.belongsTo(models.roles, {
            as: "rol",
            foreignKey: "rolId"

        })
        /* users.belongsTo(models.carts, {
            as: "users",
            foreignKey: "id"

        }) */
    

    }
    /* users.associate = function (models) {
        users.belongsTo(models.carts, {
            as: "users",
            foreignKey: "userId"

        })} */
    return users;
}