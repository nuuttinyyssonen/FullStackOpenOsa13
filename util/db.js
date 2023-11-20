const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

require('dotenv').config();
const db = new Sequelize(process.env.DATABASE_URL);

const connectToDatbase = async () => {
    try {
      await db.authenticate();
      console.log("database connected");
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return process.exit(1);
    }
    return null;
}

module.exports = { connectToDatbase, db };