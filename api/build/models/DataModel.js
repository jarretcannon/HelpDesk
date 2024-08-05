"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModel = void 0;
exports.DataModelFactory = DataModelFactory;
const sequelize_1 = require("sequelize");
// Define the DetailedRequest model
class DataModel extends sequelize_1.Model {
}
exports.DataModel = DataModel;
// Initialize the model
function DataModelFactory(sequelize) {
    DataModel.init({
        helpId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: sequelize_1.DataTypes.TEXT, // Change from STRING to TEXT
            allowNull: false,
            unique: false
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'New',
            unique: false
        }
    }, {
        sequelize,
        tableName: 'data_model' // Ensure this matches your table name
    });
}
