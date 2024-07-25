"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpDesk_1 = require("../models/helpDesk");
const router = express_1.default.Router();
router.put("/requests/:id", async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body;
        const [updated] = await helpDesk_1.Request.update({ status }, { where: { helpId: requestId } });
        if (updated) {
            const updatedRequest = await helpDesk_1.Request.findByPk(requestId);
            res.status(200).json(updatedRequest);
        }
        else {
            res.status(404).json({ message: "Request not found" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map