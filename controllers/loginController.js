'use strict';

//Vamos a querer que el controlador devuelva un objeto con diferentes métodos como renderizar, post, delete, etc. Y estas funciones son las que utilizaré en app.js para engancharlas a los middlewares. En app.js añado en las rutas del website app.use('/login') y engancho ese middleware con este controlador para que ejecute lo que yo quiera app.use('/login', require ('./controllers/loginController'))


//1. Se puede hacer con un  objeto literal con 2 métodos...

// module.exports ={

//    index:  (req, res, next) => {
//         res.render('login');
//     },

//     post: (req, res, next) => {

//     }
// };

//2. Se puede hacer con una clase

const {Usuario} = require('../models');


class LoginController {

    /** 
     * GET A /login
    */

    index(req, res, next){
        res.locals.email = ""; //Inicializamos esta variable a un string vacio para que la vista no me de error a la hora de cargar esta página pro primera vez. Lo mismo con el mensaje de error
        res.locals.error = '';
        res.render('login');
    }

     /** 
     * POST A /login
    */

    async post(req, res, next){

        try {
                const {email, password} = req.body;
            console.log(email, password);

            //1. Buscar el usuario en la base de datos

            const usuario = await Usuario.findOne({ email});
                console.log(usuario)


            //2. Si no encontramos el usuario en la base de datos ---> error
             //3. Si lo encontramos y no coincide la clave ---> error

            if(!usuario || !(await usuario.comparePassword(password)) ){

                //Si las credenciales son inválidas:
                res.locals.email = email; // Le paso a la vista el email que voy a recibir para que le mantenga el email que ha escrito cuando le vuelva a pedir la contraseña porque las credenciales eran erroneas
                res.locals.error = 'Invalid Credentials';
                res.render('login');
                return //Pongo un return para que no siga ejecutando lo siguiente
            }

            //4. Si el usuario existe y la clave coincide, le redirigimos a la zona privada. Apuntar a la sesion del usuario su _id

            req.session.usuarioLogado = {
                _id: usuario._id
            }

            //5. redidirijo a la página privada
            res.redirect("/private")

            
        } catch (error) {
            next(error);
            
        }
        
    }

/**
 * GET/logout
 */

 logout(req,res,next){
     req.session.regenerate(error => {
         if(error){
             next(error);
             return
         }
         res.redirect('/');
     }) // Borra la sesión de la memoria y crea una nueva vacía
 }

}

module.exports = new LoginController();