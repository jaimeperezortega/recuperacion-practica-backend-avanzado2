

const mongoose = require("mongoose");
const Producto = require("../models/Producto");



const { nextTick } = require("process");
const { read, readFile, readFileSync } = require("fs");
require("../lib/connectMongoose");


 //Iniciar el proceso
mongoose.connection.once("open", async (req, res, next) => {
    try {
        //Clean Data in Data Base
        Producto.deleteMany(function (err, result) {
            if (err) {
                return cb(err);
            }
        });
        //Read ad data.json
        const newData = readFileSync("files/productos-prueba.json");
        const producto = JSON.parse(newData);
        //Inserts the data in the Database
        await Producto.insertMany(producto);
    } catch (error) {
        next(error);
    }
});