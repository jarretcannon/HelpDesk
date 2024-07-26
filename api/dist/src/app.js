"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const helpDesk_1 = require("./models/helpDesk");
const requestController_1 = require("./controllers/requestController");
(0, helpDesk_1.RequestFactory)(models_1.default);
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/requests", requestController_1.getAllRequests);
app.post("/requests", requestController_1.createRequest);
app.get("/requests/:id", requestController_1.getRequest);
app.put("/requests/:id", requestController_1.updateRequest);
app.delete("/requests/:id", requestController_1.deleteRequest);
models_1.default
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
//# sourceMappingURL=app.js.map