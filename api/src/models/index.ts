import { Sequelize } from 'sequelize';

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('zealthyDatabase', 'root', 'MartinD-15', {
      host: 'localhost',
      dialect: 'mysql',
    });

export default sequelize;
