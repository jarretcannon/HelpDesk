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

app.get("/", (req, res) => {
  res.send("Welcome to the Help Desk API");
});

app.get("/requests", getAllRequests);
app.post("/requests", createRequest);
app.get("/requests/:id", getRequest);
app.put("/requests/:id", updateRequest);
app.delete("/requests/:id", deleteRequest);


app.use((req, res, next) => {
  res.status(404).send("404: Route not found");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
