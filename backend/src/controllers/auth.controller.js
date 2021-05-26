const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.roles;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*
1. Capturamos del formulario
2. Validar la informacion 
3. Guardamos la informacion 
4. Enviar mensaje para confirmar el proceso se cumplio 
*/

// Registro de usuarios

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nombre_usuario:req.body.nombre_usuario,
    cedula:req.body.cedula,
    direccion_casa:req.body.direccion_casa,
    correo:req.body.correo,
    fecha_nacimiento:req.body.fecha_nacimiento,
    noticias:req.body.noticias,
    libros_pendiente:req.body.libros_pendiente,
    contraseña:bcrypt.hashSync(req.body.contraseña, 8)
})
    .then(user => {
      if (req.body.roles) {
        Role.findOne({
          where: {
            role: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })

};
// Inicio de sesion

exports.signin = (req, res) => {
  // Validar si el correo existe en la base de datps
    User.findOne({
      where: {
        correo: req.body.correo
      }
    })
    // Generar promesa
      .then(user => {
    // Validar si el usuario no existe
        if (!user) {
          return res.status(404).send({ message: "Usuario no encontrado" });
        }
        
    // Validar contraseña

        const passwordIsValid = bcrypt.compareSync(
          req.body.contraseña,
          user.contraseña
        );
      
    // Enviar mensaje
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        // Asignar un token

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400
        });

        // Roles de usuario
  
        const authorities = [];
        user.getRoles()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].role.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            correo: user.correo,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };