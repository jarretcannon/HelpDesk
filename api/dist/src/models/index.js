"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("zealthyDatabase", "root", "MartinD-15", {
    host: "localhost",
    dialect: "mysql",
});
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (err) {
        console.error("Unable to connect to the database:", err);
    }
}
initializeDatabase();
exports.default = sequelize;
//# sourceMappingURL=index.js.map