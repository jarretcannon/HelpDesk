import express from "express";
import { Request as RequestModel } from "../models/helpDesk";

const router = express.Router();

router.put("/requests/:id", async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const [updated] = await RequestModel.update(
      { status },
      { where: { helpId: requestId } }
    );

    if (updated) {
      const updatedRequest = await RequestModel.findByPk(requestId);
      res.status(200).json(updatedRequest);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
