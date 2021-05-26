// Token especial de inicio de sesion unico
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

// Declaramos variable para instanciar el modelo de usuarios
const User = db.user;

// Verificar token

/* 
PETICIONES
1. Cabeza => headers  = token x-access-tokens 
2. Cuerpo => body = req.body 

FORMULARIO 
nombre
cedula
correo 
contraseña
*/

verifyToken = (req,res,next) =>{
    // Guardar informacion del token
    const token = req.headers['x-access-token'];

    // Validacion token
    if(!token){
        return res.status(403).send({message: 'No hay token'});
    }

    // Verificar token 
    jwt.verify(token, config.secret, (err, decoded) =>{
    // Manejador de errores
        if(err){
            return res.status(403).send({message:'¡No esta autorizado!'});
        }

        req.userId = decoded.id;

        next();
    })
}

// Validar administrador 

/*
1. usuarios = nombre, id_rol
2. rol = id, rol
3. Relacion = id_rol = id
[id:1 = "cliente", id:2 = "admin",id:3 =  "visitante", ... n roles]

ACCIONES
1. buscar el id del usuario
2. traer los roles
3. validemos el tipo que tenga 


*/


isAdmin = (req, res, next) =>{
    // 1. Buscar por consulta el id del usuario
    User.findByPk(req.userId)
    // 2. Generar promesa para traer roles de usuario
    .then(user =>{
    // 3. Traer roles de usuario para validar si el rol de usuario es admin
        user.getRoles()
        .then(roles => {
    // 4. Iterar vector de roles para buscar el rol admin
            for(let i = 0; i<= roles.length; i++){
    // 5. Validar el rol de admin
                if(roles[i].role === "admin"){
                    next();
                    return;
                }
            }
    // Manejo de errores
            res.status(403).send({
                message:'Requiere rol de admin'
            });
            return;
        });
    });
}

// Validacion rol de cliente

isCliente = (req,res,next) =>{
    User.findByPk(req.userId)
    .then(user =>{
        user.getRoles()
        .then(roles =>{
            for(let i = 0; i<=roles.length; i++){
                if(roles[i].role === "cliente")
                {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message:'Requiere el rol de cliente'
            });
        });
    });
}

const authJwt = {
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isCliente:isCliente
}

module.exports = authJwt;