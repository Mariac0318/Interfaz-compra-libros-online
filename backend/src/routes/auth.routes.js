// importamos middleware
const {verifySignUp} = require('../middleware');
// Importamos controlador
const controller = require('../controllers/auth.controller');


// Exportar las rutas 
module.exports = function(app){
    // Habilitar configuracion para las peticiones
    app.use((req,res,next) =>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Ruta de registro de usuarios

    app.post("/api/auth/signup", 
    // Aplicamos los middleware
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    // Implementamos el registro de usuarios
    controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
}