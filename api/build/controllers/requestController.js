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
exports.deleteRequest = exports.updateRequest = exports.getRequest = exports.createRequest = exports.getAllRequests = void 0;
const helpDesk_1 = require("../models/helpDesk");
const getAllRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield helpDesk_1.Request.findAll();
        res.status(200).json(requests);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllRequests = getAllRequests;
const createRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, description } = req.body;
        if (name && email && description) {
            const newRequest = yield helpDesk_1.Request.create({
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
});
exports.createRequest = createRequest;
const getRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        const request = yield helpDesk_1.Request.findByPk(requestId);
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
});
exports.getRequest = getRequest;
const updateRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).send("Status field is required");
        }
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
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestId = req.params.id;
        const deleted = yield helpDesk_1.Request.destroy({
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
});
exports.deleteRequest = deleteRequest;
