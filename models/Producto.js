'use strict';


//Cargamos la librería de Mongoose

const mongoose = require("mongoose");


//1. Definimos un esquema

const productoSchema = mongoose.Schema({
    name: {type: String, index: true},
    price: {type: Number, index: true},
    venta: Boolean,
    photo: String,
    tags: [String],
}, {
    collection: "anuncios"
});

//PODEMOS CREAR MÉTODOS PERSOANLIZADOA A NUESTRO MODELO QUE NO VIENEN PRECARGADOS EN MONGOOSE. Ojo, en los métodos de Mongoose no se pueden usar arrow functions

productoSchema.statics.lista = function(filtro, limit, skip, fields, sort){ //Un método estático es el que va a tener este mdelo
    const query = Producto.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();

}


//2. Creamos el modelo con el esquema definido

const Producto = mongoose.model("Producto", productoSchema);

//3. Exportamos el modelo

module.exports = Producto;