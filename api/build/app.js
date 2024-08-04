"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const helpDesk_1 = require("./models/helpDesk");
const routes_1 = __importDefault(require("./routes/routes"));
(0, helpDesk_1.RequestFactory)(models_1.default);
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
models_1.default
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
