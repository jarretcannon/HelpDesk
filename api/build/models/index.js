"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Get database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/zealthyDatabase";
// Create a new Sequelize instance with the database URL
const sequelize = new sequelize_1.Sequelize(DATABASE_URL, {
    dialect: "mysql",
    logging: false, // Set to `true` if you want to see SQL queries in the logs
});
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Connection has been established successfully.");
        }
        catch (err) {
            console.error("Unable to connect to the database:", err);
        }
    });
}
initializeDatabase();
exports.default = sequelize;
