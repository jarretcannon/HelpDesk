import express from "express";
import cors from "cors";
import sequelize from "./models";
import { RequestFactory } from "./models/helpDesk";
import {
  getAllRequests,
  createRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} from "./controllers/requestController";

RequestFactory(sequelize);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/requests", getAllRequests);
app.post("/requests", createRequest);
app.get("/requests/:id", getRequest);
app.put("/requests/:id", updateRequest);
app.delete("/requests/:id", deleteRequest);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

process.on('uncaughtException', (err: any) => {
  console.error('Unhandled exception', err);
  process.exit(1);
});

export default sequelize;
