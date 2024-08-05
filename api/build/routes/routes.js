"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = require("../controllers/requestController");
const router = express_1.default.Router();
router.get("/requests", requestController_1.getAllRequests);
router.post("/requests", requestController_1.createRequest);
router.get("/requests/:id", requestController_1.getRequest);
router.put("/requests/:id", requestController_1.updateRequest);
router.delete("/requests/:id", requestController_1.deleteRequest);
exports.default = router;
