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

class LoginController {
    index(req, res, next){
        res.render('login');
    }

    post(req, res, next){

    }
}

module.exports = new LoginController();