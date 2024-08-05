import express from "express";
import cors from "cors";
import sequelize from "./models";
import { RequestFactory } from "./models/helpDesk";
import router from "./routes/routes";


RequestFactory(sequelize);

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(router); 

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });