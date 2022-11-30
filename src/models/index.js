'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customersSchema = require('./customers.schema');

// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/api-app' <-- if you have a username and password
// will use ternary here to set up sqlite for testing

// const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;



// instantiate our sequelize connection to our database
const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// create a customer model with our schema
const CustomerModel = customersSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  CustomerModel,
};
