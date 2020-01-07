import { Router } from "express";
import middlewares from "../middlewares";
import controllers from "../controllers";

const { Auth } = middlewares;
const { RsvpController } = controllers;

const rsvpController = new RsvpController();

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: {
      message: "Welcome to the Event Manager Rsvp API.",
      allowedMethod: ["GET", "POST", "DELETE"],
      prefix: "/api/v1",
      routes: ["/rsvp/:eventId", "/rsvps/byUser", "/rsvp/:id", "/rsvp/:id", "/rsvps/byEvent/:eventId"]
    }
  });
});

router.post(
  "/rsvp/:eventId",
  Auth.checkAuth,
  Auth.populateBody,
  Auth.checkKeys,
  Auth.checkIfRsvped,
  rsvpController.create
);

router.get("/rsvp/:eventId", rsvpController.getByEventId);
router.get("/rsvps/byUser", Auth.checkAuth, rsvpController.getByUserId);
router.delete("/rsvp/:id", Auth.checkAuth, rsvpController.deleteRsvp);
router.delete("/rsvps/byUser", Auth.checkAuth, rsvpController.deleteAllRsvpByUser);
router.delete("/rsvps/byEvent/:eventId", rsvpController.deleteAllRsvpByEventId);

export default router;
