'use strict';


//Cargamos la librería de Mongoose

const mongoose = require("mongoose");
const fs = require('fs-extra')
const path = require('path')
const cote = require('cote')
const fsPromises = require('fs').promises

const thumbnailRequester = new cote.Requester({
    name: 'thumbnail creator client'
  }, { log: false, statusLogsEnabled: false })
  

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

productoSchema.methods.setPhoto = async function ({ path: imagePath, originalname: imageOriginalName }) {
    if (!imageOriginalName) return
  
    const imagePublicPath = path.join(__dirname, '../public/images', imageOriginalName)
    await fs.copy(imagePath, imagePublicPath)
  
    this.photo = imageOriginalName;
    thumbnailRequester.send({ type: 'createThumbnail', image: imagePublicPath })


}
  

//2. Creamos el modelo con el esquema definido

const Producto = mongoose.model("Producto", productoSchema);

//3. Exportamos el modelo

module.exports = Producto;