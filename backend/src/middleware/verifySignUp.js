const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

// Validar si el correo no este duplicado

checkDuplicateEmail = (req,res,next) =>{
    // Validar correo de usuario
    User.findOne({
        where:{correo:req.body.correo}
    })
    .then(user =>{
        if(user){
            res.status(400).send({
                message: 'El correo ya esta guardado'
            })
            return;
        }
        next();
    })
}

/*
["admin", "moderador", "cliente"]
*/

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};


const verifySignUp = {
    checkDuplicateEmail:checkDuplicateEmail,
    checkRolesExisted:checkRolesExisted
};

module.exports = verifySignUp;




