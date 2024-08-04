import express from "express";
import cors from "cors";
import sequelize from "./models";
import { RequestFactory } from "./models/helpDesk";
import router from "./routes/routes";


RequestFactory(sequelize);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(router); 

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

