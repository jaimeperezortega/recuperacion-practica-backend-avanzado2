'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // recoger el jwtToken de la cabecera (o de otros sitios)
    
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token

    // comprobar que tengo Token 

    if(!jwtToken) { //No me dan el token
        const error = new Error('No token provided');
        error.status = 401;
        next(error);
        return
    }

    // comprobar que el Token es válido
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload)=>{
        if(error){
            error.status = 401;
            next(error);
            return
        }
        req.apiAuthUserId = payload._id;
        next();
    })
    
}