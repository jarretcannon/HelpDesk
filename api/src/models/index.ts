import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.JAWSDB_URL as string);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}
initializeDatabase();

export default sequelize;
