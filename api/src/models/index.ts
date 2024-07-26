import { Sequelize } from "sequelize";

const databaseUrl = process.env.JAWSDB_URL || "mysql://root:MartinD-15@localhost:3306/zealthyDatabase";

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false, 
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

initializeDatabase();

export default sequelize;
