const { Sequelize } = require('sequelize');

console.log('JAWSDB_URL:', process.env.JAWSDB_URL);

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  logging: console.log
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
