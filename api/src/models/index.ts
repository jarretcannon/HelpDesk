import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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
