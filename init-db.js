'use strict';

require('dotenv').config();

const { mongoose, connectMongoose, Usuario, Producto } = require('./models');
const bcrypt = require('bcrypt');


main().catch(err => console.error(err));

async function main() {

  // inicializo colección de usuarios
  await initUsuarios();

  mongoose.connection.close();
}

async function initUsuarios() {
  const { deletedCount } = await Usuario.deleteMany();
  console.log(`Eliminados ${deletedCount} usuarios.`);

  const result = await Usuario.insertMany([
    {
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234')
    },
    {
        email: 'jaimep.ortega@gmail.com',
        password: await Usuario.hashPassword('12345')
      }
    
  ]);
  console.log(`Insertados ${result.length} usuario${result.length > 1 ? 's' : ''}.`)
}

