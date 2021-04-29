'use strict';

//Vamos a querer que el controlador devuelva un objeto con diferentes métodos como renderizar, post, delete, etc. Y estas funciones son las que utilizaré en app.js para engancharlas a los middlewares. En app.js añado en las rutas del website app.use('/login') y engancho ese middleware con este controlador para que ejecute lo que yo quiera app.use('/login', require ('./controllers/loginController'))


//1. Se puede hacer con un  objeto literal...

// const controller = {
//     index(){

//     },
//     post(){

//     }
// }

//2. Se puede hacer con una clase

module.exports = (req, res, next) => {
    res.render('login');
}
