import express from "express";
import { createRequest, deleteRequest, getAllRequests, getRequest, updateRequest } from "../controllers/requestController";


const router = express.Router();

router.get("/requests", getAllRequests);
router.post("/requests", createRequest);
router.get("/requests/:id", getRequest);
router.put("/requests/:id", updateRequest);
router.delete("/requests/:id", deleteRequest);

export default router;
