import { RequestHandler } from "express";
import { Request as RequestModel } from "../models/helpDesk";

export const getAllRequests: RequestHandler = async (req, res, next) => {
  try {
    const requests = await RequestModel.findAll();
    res.status(200).json(requests);
  } catch (err: unknown) {
    next(err);
  }
};

export const createRequest: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, description } = req.body;
    if (name && email && description) {
      const newRequest = await RequestModel.create({
        name,
        email,
        description,
      });
      res.status(201).json(newRequest);
    } else {
      res.status(400).send("Missing required fields");
    }
  } catch (err: unknown) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
};

export const getRequest: RequestHandler = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const request = await RequestModel.findByPk(requestId);

    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err: unknown) {
    next(err);
  }
};

export const updateRequest: RequestHandler = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).send("Status field is required");
    }

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
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteRequest: RequestHandler = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const deleted = await RequestModel.destroy({
      where: { helpId: requestId },
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err: unknown) {
    next(err);
  }
};
