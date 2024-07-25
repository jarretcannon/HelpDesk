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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/requests.js
const express_1 = __importDefault(require("express"));
const helpDesk_1 = require("../models/helpDesk");
const router = express_1.default.Router();
router.put("/requests/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        const { status } = req.body;
        const [updated] = yield helpDesk_1.Request.update({ status }, { where: { helpId: requestId } });
        if (updated) {
            const updatedRequest = yield helpDesk_1.Request.findByPk(requestId);
            res.status(200).json(updatedRequest);
        }
        else {
            res.status(404).json({ message: "Request not found" });
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
