'use strict';

//Servicio de conversión de moneda

const cote = require('cote');

//Declarar el microservicio

const responder = new cote.Responder({name: 'servicio de moneda'});

//Crear una tabla de conversión de moneda - almacén de datos del microservicio

const rates = {
    usd_eur: 0.86,
    eur_usd: 1.14
}

// Lógica del microservicio

responder.on('convertir moneda', (req, done) =>{
    const {desde,hacia, cantidad} = req;
    console.log('servicio:', desde, hacia, cantidad,Date.now());

    //calcular el resultado

    const resultado = rates[`${desde}_${hacia}`] * cantidad;

    done(resultado);
})
