"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
exports.RequestFactory = RequestFactory;
const sequelize_1 = require("sequelize");
class Request extends sequelize_1.Model {
}
exports.Request = Request;
function RequestFactory(sequelize) {
    Request.init({
        helpId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        email: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "New",
            unique: false, //
        },
    }, {
        sequelize,
        tableName: "requests",
    });
}
//# sourceMappingURL=helpDesk.js.map