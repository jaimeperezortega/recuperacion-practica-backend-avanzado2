
/**
 * Este fichero de app.js es el fichero principal de nuestra aplicación. Básicamente importa una serie de librerías, establece una serie de rutas, registramos nuestros modelos, establecemos nuestros controladores
 *///

 //1. Primero carga una serie de librerías

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//2. Carga una serie de rutas

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//3. Crea una aplicación de express que llama app

var app = express();

//Cargamos el módulo de mongoose para conectar nuestra aplicación a la base de datos

require("./models/connectMongoose");

//Setup de i18n
app.use(cookieParser());
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);
i18n.__('Welcome to NodePOP')

//4. Comienza a configurar esa aplicación de express

// view engine setup
app.set('views', path.join(__dirname, 'views')); //__dirname en nodejs simboliza el directorio actual donde está este fichero y / views engloba las vistas
app.set('view engine', 'html'); //establece que el motor de vistas es ejs
app.engine("html", require("ejs").__express);

// Cada uno de estos app.use son como esos jugadores de la partida de poker que deciden responder o pasar ante una petición. Empieza con el primero y le dice que si quiere hacer algo con esa petición. Si tiene programada una respuesta para esa petición, responde, si no, pasa. Todos los middleware tienen habitualmente 3 parámetros (req, res, next) salvo los middleware de error handler que también tienen el parámetro de error.


//Declaramos una variable local para todas las vistas
app.locals.title ="NodePOP" // A partir de este comando en app, cualquier vista tendrá acceso a la variable title NodeApi. Ya no se limitará a la ruta específica donde lo indiquemos

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


/**
 * Rutas del API
 * Aquí defino la ruta donde vamos a consumir nuestra API
 */

app.use("/", require("./routes/api/productos"));





/**
 * Rutas de mi Website
 */

app.use('/', indexRouter); // Aquí establece que cuando alguien haga una petición a la raiz del sitio, le está diciendo a nuestra aplicación que utilice este router para ver si hay que responder o no

app.use('/services', require('./routes/services'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//Cuando no encuentra el parámetro que le estamos pasando en la request crea un error de 404 y lo manda al error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if(isAPIrequest(req)){
    res.json({error:err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

//nos creamos una función auxiliar para determinar si la petición que estamos recibiendo es una petición al API
function isAPIrequest(req) {
  return req.originalUrl.indexOf('/api/') ===0; //Te dice la posición de una subcadena de texto

}

//5. Una vez configurada la aplicación de express creada, la exporta para que pueda ser cargada en otro fichero. Lo importa luego de hecho el fichero www

module.exports = app;
