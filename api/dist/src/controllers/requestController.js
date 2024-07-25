"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.updateRequest = exports.getRequest = exports.createRequest = exports.getAllRequests = void 0;
const helpDesk_1 = require("../models/helpDesk");
const getAllRequests = async (req, res, next) => {
    try {
        const requests = await helpDesk_1.Request.findAll();
        res.status(200).json(requests);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllRequests = getAllRequests;
const createRequest = async (req, res, next) => {
    try {
        const { name, email, description } = req.body;
        if (name && email && description) {
            const newRequest = await helpDesk_1.Request.create({
                name,
                email,
                description,
            });
            res.status(201).json(newRequest);
        }
        else {
            res.status(400).send("Missing required fields");
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
};
exports.createRequest = createRequest;
const getRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const request = await helpDesk_1.Request.findByPk(requestId);
        if (request) {
            res.status(200).json(request);
        }
        else {
            res.status(404).json({ message: "Request not found" });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getRequest = getRequest;
const updateRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).send("Status field is required");
        }
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
};
exports.updateRequest = updateRequest;
const deleteRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const deleted = await helpDesk_1.Request.destroy({
            where: { helpId: requestId },
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Request not found" });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deleteRequest = deleteRequest;
//# sourceMappingURL=requestController.js.map