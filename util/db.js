const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

require('dotenv').config();
const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatbase = async () => {
    try {
      await sequelize.authenticate();
      await runMigrations();
      console.log("database connected");
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return process.exit(1);
    }
    return null;
}

module.exports = { connectToDatbase, sequelize };