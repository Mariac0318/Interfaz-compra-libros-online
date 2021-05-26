// Importes de base de datos
const db = require('../config/db.config');
const Sequelize = require('sequelize');


// Conexion a la base de datos

const sequelize = new Sequelize(
    db.DB,
    db.USER,
    db.PASSWORD,
    {
        host:db.HOST,
        dialect:db.dialect,
        pool:{
            max:db.pool.max,
            min:db.pool.min,
            acquire:db.pool.acquire,
            idle:db.pool.idle
        }
    }
);

const database = {};

// Instancias del ORM

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// Importe de modelos

database.user = require('./user.model')(sequelize, Sequelize);
database.roles = require('./role.model')(sequelize, Sequelize);

// Relaciones

database.roles.belongsToMany(database.user, {
    through:"user_roles",
    foreignKey:"roleId",
    otherKey:"userId"
});

database.user.belongsToMany(database.roles, {
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});

// Roles por defecto

database.ROLES = ["visitante", "cliente", "admin"];

module.exports = database;