module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("usuarios", {
        nombre_usuario:{
            type:Sequelize.STRING
        },
        cedula:{
            type:Sequelize.BIGINT
        },
        direccion_casa:{
            type:Sequelize.STRING
        },
        correo:{
            type:Sequelize.STRING
        },
        fecha_nacimiento:{
            type:Sequelize.DATE
        },
        noticias:{
            type:Sequelize.BOOLEAN
        },
        libros_pendiente:{
            type:Sequelize.INTEGER
        },
        contraseña:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true,
    });

    return User;
}