const {authJwt} = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = (app) =>{

    // Configuracion de encabezado

    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    })

    //  Rutas de contenido para los clientes

    app.get('/api/cliente', 
    [authJwt.verifyToken, authJwt.isCliente],
    controller.Clientes
    );

    // Ruta de contenido para administradores

    app.get('/api/admin', 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.Admin
    );

    // Ruta publica
    
    app.get('/api/all', controller.allAccess);


};