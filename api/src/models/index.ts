import express from 'express';
import { Sequelize } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3000;

const databaseUrl = process.env.JAWSDB_URL || "mysql://root:MartinD-15@localhost:3306/zealthyDatabase";

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false, // Optional: Add any other configuration options you need
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default sequelize;
